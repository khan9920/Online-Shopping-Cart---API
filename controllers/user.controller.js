const userService = require("../services/users.service");
const response = require("../services/response.service");

/**
 * Create new user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.createUser = async (req, res) => {
  console.log('create user');
  try {
    // loggerService.initializeLogContentWhenJwtIsAbsent(req);

    const user = await userService.createUser(req.body);
    return response.successWithDataAndToken(user, res);
  }
  catch (error) {
    console.log(error);
    return response.customError(`${error}`, res);
  }
};

module.exports.checkUserAvailability = async (req, res) => {
  try {
    // loggerService.initializeLogContentWhenJwtIsAbsent(req);

    const user = await userService.checkUserAvailability(req.query);
    return response.successWithData(user, res);
  }
  catch (error) {
    return response.customError(`${error}`, res);
  }
};
/**
 * Login to the system
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.login = async (req, res) => {
  try {

    const user = await userService.login(req.body);

    return response.successWithDataAndToken(user, res);
  }
  catch (error) {
    return response.customError(`${error}`, res);
  }
};

/**
 * Update a user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.updateUser = async (req, res) => {
  try {

    const user = await userService.updateUser(req.body);
    return response.successWithData(user, res);
  }
  catch (error) {
    logger.error(error);
    return response.customError(`${error}`, res);
  }
};

/**
 * Update password
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.updatePassword = async (req, res) => {
  try {

    const user = await userService.updatePassword(req.body);

    return response.successWithMessage(user, res);
  }
  catch (error) {
    return response.customError(`${error}`, res);
  }
};

/**
 * Delete user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUserById(req.query.id);
    return response.successWithMessage("User deleted.", res);
  }
  catch (error) {
    return response.customError(`${error}`, res);
  }
};

/**
 * Reset password
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.resetPassword = async (req, res) => {
  try {
    const user = await userService.resetPassword(req.body);
    return response.successWithMessage(user, res);
  }
  catch (error) {
    return response.customError(`${error}`, res);
  }
};


/**
 * Get users by id or roles
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.getUsers = async (req, res) => {
  try {
    let user;
    let recordsTotal;
    let recordsFiltered;

    if (req.query.id != null) {
      user = await userService.getUserById(req.query.id);
    }
    else if ((req.query.roles != null && req.query.roles.length !== 0)) {
      const data = await userService.getUsers(req.query);
      user = data.users;
      recordsTotal = data.recordsTotal;
      recordsFiltered = data.recordsFiltered;
    }

    if (user == null) {
      return response.dataNotFound("No data available.", res);
    }
    return response.successWithData(user, res, recordsTotal, recordsFiltered);
  }
  catch (error) {
    console.log(error);
    return response.customError(`${error}`, res);
  }
};

/**
 * Get building managers
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.getBuildingManagers = async (req, res) => {
  try {
    const data = await userService.getBuildingManagers(req.query);
    return response.successWithData(data, res);
  }
  catch (error) {
    return response.customError(`${error}`, res);
  }
};
