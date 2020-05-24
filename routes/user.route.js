const express = require("express");

const router = express.Router();

const { permissions } = require("../permissions/user.permission");
const userController = require("../controllers/user.controller");
const userSchema = require("../models/user.schema");
const validator = require("../services/validator.service");

// User creation route
router
  .route(permissions.createUser.path)
  .post(
    validator.validateBody(userSchema.newUser),
    userController.createUser,
  );

router
  .route(permissions.getUserAvailability.path)
  .get(
    validator.validateQueryParameters(userSchema.email),
    userController.checkUserAvailability
  )

// Employee creation route
router
  .route(permissions.createEmployee.path)
  .post(
    validator.validateBodyWithToken(userSchema.newUser, permissions.createEmployee.grantedUserRoles),
    userController.createUser,
  )
router
  .route(permissions.login.path)
  .post(
    validator.validateBody(userSchema.login),
    userController.login,
  );
router
  .route(permissions.updateUser.path)
  .put(
    validator.validateBodyWithToken(userSchema.updateUser, permissions.updateUser.grantedUserRoles),
    userController.updateUser,
  );
router
  .route(permissions.updatePassword.path)
  .put(
    validator.validateBody(userSchema.updatePassword),
    userController.updatePassword,
  );
router
  .route(permissions.resetPassword.path)
  .put(
    validator.validateBody(userSchema.email),
    userController.resetPassword,
  );
router
  .route(permissions.deleteUser.path)
  .delete(
    validator.validateQueryParameters(userSchema.id, permissions.deleteUser.grantedUserRoles),
    userController.deleteUser,
  );
router
  .route(permissions.getUserById.path)
  .get(
    // validator.validateHeader(permissions.getUserById.grantedUserRoles),
    validator.validateQueryParameters(userSchema.getUserById),
    userController.getUsers,
  );
router
  .route(permissions.getUsersByRoles.path)
  .get(
    validator.validateHeader(permissions.getUsersByRoles.grantedUserRoles),
    validator.validateQueryParameters(userSchema.getUsersByRoles),
    userController.getUsers,
  );
router
  .route(permissions.getUsersByParentId.path)
  .get(
    validator.validateHeader(permissions.getUsersByParentId.grantedUserRoles),
    validator.validateQueryParameters(userSchema.getUsersByParentId),
    userController.getUsers,
  );
router
  .route(permissions.getBuildingManagers.path)
  .get(
    validator.validateHeader(permissions.getBuildingManagers.grantedUserRoles),
    validator.validateQueryParameters(userSchema.getBuildingManagers),
    userController.getBuildingManagers,
  );

module.exports = router;
