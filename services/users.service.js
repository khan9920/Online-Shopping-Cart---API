const mongoose = require("mongoose");
const generatePassword = require("password-generator");
const userRepository = require("../repository/user.repository");
const mailer = require("../mail-hub/mailer");
const commonService = require("../services/common.service");
const Model = require("../models/user.model");
const config = require("../config/config");
const cartController = require('../controllers/cartController');
const wishListController = require('../controllers/wishlistController');
const sortingConfig = require("../config/sort.config");

/**
 * Create new user
 * @param body
 * @returns {Promise<*>}
 */
module.exports.createUser = async (body) => {
  const existingUser = await this.getUserByEmail(body.email);

  if (existingUser == null) {
    // Create new user
    let newUser = new Model(body);
    newUser.setPassword(body.password);
    newUser = await userRepository.save(newUser);

    try {
      // Send email
      await mailer.sendNewAccountCreated(newUser.email, newUser.email);

      newUser = newUser.toObject();
      delete newUser.password;
      delete newUser.salt;
      cartController.createCartMethod({user_ID: newUser._id}).then(data => {
        console.log(data);
        if (data.status) {
          console.log('cart created');
        }
      });
      wishListController.createWishListMethod({user_ID: newUser._id}).then(data => {
        console.log('Wish list Created');
      })
        .catch( () => {
          console.log('Wish list Creation Failed');
      })
      return newUser;
    }
    catch (error) {
      // Delete created user
      await this.deleteUserById(newUser._id);

      throw new Error(error);
    }
  }
  else {
    throw new Error("Email already exists.");
  }
};

module.exports.checkUserAvailability = async (body) => {
  const user = await this.getUserByEmail(body.email);
  if (!user) {
    console.log('no user');
    return {
      available: false
    }
  }
  return {
    available: true
  };
}

/**
 * User login
 * @param body
 * @returns {Promise<*>}
 */
module.exports.login = async (body) => {
  const user = await this.getUserByEmail(body.email);
  const invalidEmailOrPassword = "Invalid username / password.";

  // If user exists
  if (user != null) {
    const passwordValidity = user.validatePassword(body.password);

    // Valid password
    if (passwordValidity === true) {
      return {
        _id: user._id,
        email: user.email,
        role: user.role,
        is_forgot_pass: user.forgot_password
      };
    }

    throw new Error(invalidEmailOrPassword);
  }
  else {
    throw new Error(invalidEmailOrPassword);
  }
};

/**
 * Update a user
 * @param body
 * @returns {Promise<unknown>}
 */
module.exports.updateUser = async (body) => {

  const user = await this.getUserByEmail(body.email);

  // If email is not updated or new email
  if ((user != null && String(user._id) === body._id) || (user == null)) {
    let userUpdated = await userRepository.updateUser({
      _id: body._id,
    }, body, {
      new: true,
    });

    userUpdated = userUpdated.toObject();
    delete userUpdated.salt;
    delete userUpdated.password;

    return userUpdated;
  }

  // If email is updated to that of another user
  throw new Error("Email already exists.");
};

/**
 * Update password
 * @param body
 * @returns {Promise<string>}
 */
module.exports.updatePassword = async (body) => {

  const user = await this.getUserByEmail(body.email);

  // If user exists
  if (user != null) {

    const passwordValidity = user.validatePassword(body.oldPassword);

    // If old password is correct
    if (passwordValidity === true) {

      user.setPassword(body.newPassword);
      user.forgot_password = false;

      await userRepository.save(user);

      await mailer.sendPasswordUpdatedNotification(user.email);
      const success = "Password updated successfully.";
      return success;
    }

    const invalidCurrentPassword = "Current password is incorrect.";
    throw new Error(invalidCurrentPassword);
  }
  else {
    const invalidEmail = "Invalid email.";
    throw new Error(invalidEmail);
  }
};

/**
 * Reset password and send email
 * @param body
 * @returns {Promise<string>}
 */
module.exports.resetPassword = async (body) => {
  const user = await this.getUserByEmail(body.email);

  // If user exists
  if (user != null) {
    const password = generatePassword(8, false);
    user.setPassword(password);
    user.forgot_password = true;

    await userRepository.save(user);

    await mailer.resetPassword(user.email, password);
    const success = "Password reset successfully.";
    return success;
  }

  throw new Error("Invalid email.");
};

/**
 * Get users by id
 * @param userId
 * @returns {Promise<unknown>}
 */
module.exports.getUserById = async (userId) => {
  const user = await userRepository.findOne({
    _id: userId,
  }, {
    salt: 0,
    password: 0,
  });

  // Populate building id, company id, and building managers
  return Model.populate(user, [{
    path: "building_id",
    select: "-bank_account -nmi_account_name",
    populate: {
      path: "managers.user_id",
      select: "-salt -password",
    },
  }, {
    path: "company_id",
  }]);
};

/**
 * Get users by roles or parent id
 * @param body
 * @returns {Promise<{recordsFiltered: *, recordsTotal: *, users: unknown}>}
 */
module.exports.getUsers = async (body) => {
  const { roles } = body;
  const pageNo = +body.page;
  let limit = +body.limit;
  const searchKeyWord = body.search;
  let sortingOrder = body.order === sortingConfig.sortingOrder.descending ? -1 : 1;
  const { column } = body;
  let sortingColumn = sortingConfig.sortingColumn.users[body.column];
  const sortQuery = {};
  let matchQuery;
  const { status } = body;
  let recordsFiltered;
  let users;

  // Set sorting column and order if they are not specified
  if (column == null || column === "" || column === -1) {
    sortingColumn = "createdAt";
    sortingOrder = -1;
  }

  sortQuery[sortingColumn] = sortingOrder;

  // Filter users by roles and active status
  if (roles != null) {
    // Active users
    if (status === config.status.active) {
      matchQuery = {
        role: { $in: roles },
        delete_date: null,
      };
    }
    // Deactive users
    else if (status === config.status.deactive) {
      matchQuery = {
        role: { $in: roles },
        delete_date: { $ne: null },
      };
    }
    // All users
    else if (status === config.status.all) {
      matchQuery = {
        role: { $in: roles },
      };
    }
    // No users
    else {
      matchQuery = {
        status: config.status.unavailable,
      };
    }
  }
  // Filter users by parent id
  // else if (parentId != null) {
  //   matchQuery = {
  //     parent_id: mongoose.Types.ObjectId(parentId),
  //     delete_date: null,
  //   };
  // }

  const prePaginationQuery = [
    {
      $match: matchQuery,
    },
    {
      $addFields: {
        first_name_lowercase: { $toLower: "$first_name" },
        last_name_lowercase: { $toLower: "$last_name" },
        company_name_lowercase: { $toLower: "$company_id.name" },
        state_lowercase: { $toLower: "$state" },
      },
    },
  ];

  let recordsTotal = await userRepository.findByAggregateQuery([
    ...prePaginationQuery,
    { $count: "count" },
  ]);

  recordsTotal = (recordsTotal == null || recordsTotal.length === 0) ? 0 : recordsTotal[0].count;

  // Set limit to positive value
  limit = commonService.setLimitToPositiveValue(limit, recordsTotal);

  // If no search keyword
  if (searchKeyWord == null || searchKeyWord === "") {
    users = await userRepository.findByAggregateQuery([
      ...prePaginationQuery,
      { $sort: sortQuery },
      { $skip: pageNo ? (limit * (pageNo - 1)) : 0 },
      { $limit: limit || recordsTotal },
      {
        $project: {
          password: 0,
          salt: 0,
          "building_id.nmi_account_name": 0,
          "building_id.bank_account": 0,
        },
      },
    ]);

    recordsFiltered = recordsTotal;
  }
  // If search keyword is present
  else {
    const searchQuery = [
      ...prePaginationQuery,
      {
        $match: {
          $or: [
            { email: { $regex: searchKeyWord, $options: "i" } },
            { first_name: { $regex: searchKeyWord, $options: "i" } },
            { last_name: { $regex: searchKeyWord, $options: "i" } },
            { role: { $regex: searchKeyWord, $options: "i" } },
            { phone: { $regex: searchKeyWord, $options: "i" } },
            { state: { $regex: searchKeyWord, $options: "i" } },
          ],
        },
      },
    ];

    users = await userRepository.findByAggregateQuery([
      ...searchQuery,
      { $sort: sortQuery },
      { $skip: pageNo ? (limit * (pageNo - 1)) : 0 },
      { $limit: limit || recordsTotal },
      {
        $project: {
          password: 0,
          salt: 0,
          "building_id.nmi_account_name": 0,
          "building_id.bank_account": 0,
        },
      },
    ]);

    recordsFiltered = await userRepository.findByAggregateQuery([
      ...searchQuery,
      { $count: "count" },
    ]);

    recordsFiltered = (recordsFiltered == null || recordsFiltered.length === 0) ? 0 : recordsFiltered[0].count;
  }

  return {
    users,
    recordsTotal,
    recordsFiltered,
  };
};

/**
 * Get building managers
 * @param body
 * @returns {Promise<*[]>}
 */
module.exports.getBuildingManagers = async (body) => {
  const { assigned } = body;

  let query = {
    role: config.userRoles.storeManager,
    delete_date: null,
  };

  // BMs unassigned to any building
  if (assigned === false || assigned === "false") {
    query = {
      ...query,
      building_id: null,
    };
  }
  // Already assigned BMs
  else if (assigned === true || assigned === "true") {
    query = {
      ...query,
      building_id: { $ne: null },
    };
  }

  return userRepository.findMany(query, {
    salt: 0,
    password: 0,
  });
};

/**
 * Get user by email
 * @param email
 * @returns {Promise<*>}
 */
module.exports.getUserByEmail = async (email) => userRepository.findOne({
  email: { $regex: `^${email}$`, $options: "i" },
  delete_date: null,
});

/**
 * Delete user by id
 * @param userId
 * @returns {Promise<unknown>}
 */
module.exports.deleteUserById = async (userId) => {
  return userRepository.updateUser(
    {
      _id: userId,
    },
    {
      delete_date: new Date(),
    },
  );
};
