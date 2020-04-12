const { userRoles } = require("../config/config");

module.exports.permissions = {
  createUser: {
    path: "/user",
  },
  createEmployee: {
    path: "/employee",
    grantedUserRoles: [userRoles.admin]
  },
  updateUser: {
    path: "/",
    grantedUserRoles: [userRoles.admin, userRoles.storeManager, userRoles.user],
  },
  resetPassword: {
    path: "/password/reset",
  },
  deleteUser: {
    path: "/",
    grantedUserRoles: [userRoles.admin, userRoles.storeManager, userRoles.user],
  },
  login: {
    path: "/login",
  },
  updatePassword: {
    path: "/password",
    grantedUserRoles: [userRoles.admin, userRoles.storeManager, userRoles.user, userRoles.client],
  },
  getUserById: {
    path: "/",
    grantedUserRoles: [userRoles.admin, userRoles.storeManager, userRoles.user],
  },
  getUsersByRoles: {
    path: "/roles",
    grantedUserRoles: [userRoles.admin, userRoles.storeManager],
  },
  getUsersByParentId: {
    path: "/parent-id",
    grantedUserRoles: [userRoles.admin, userRoles.storeManager, userRoles.user],
  },
  getBuildingManagers: {
    path: "/building-managers",
    grantedUserRoles: [userRoles.admin],
  },
};
