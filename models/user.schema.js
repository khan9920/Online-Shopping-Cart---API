const joi = require("@hapi/joi");
const config = require("../config/config");
const paginationConfig = require("../config/pagination.config");

const { userRoles } = config;

module.exports.id = joi.object().keys({
  id: joi
    .string()
    .alphanum()
    .min(24)
    .max(24)
    .required(),
});

const keyFobs = joi.object().keys({
  fob: joi
    .string()
    .required(),
});

module.exports.newUser = joi.object().keys({
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .required(),
  role: joi
    .string()
    .valid(userRoles.admin, userRoles.storeManager, userRoles.user)
    .required(),
  first_name: joi
    .string()
    .trim()
    .alphanum()
    .min(1)
    .required(),
  last_name: joi
    .string()
    .trim()
    .alphanum()
    .min(1)
    .required(),
  phone: joi
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-s. ]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
    .max(15)
    .required(),
  key_fobs: joi
    .array()
    .items(keyFobs),
});

module.exports.email = joi.object().keys({
  email: joi
    .string()
    .email()
    .required(),
});

module.exports.updateUser = joi.object().keys({
  _id: joi
    .string()
    .alphanum()
    .min(24)
    .max(24)
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  first_name: joi
    .string()
    .trim()
    .alphanum()
    .min(1),
  last_name: joi
    .string()
    .trim()
    .alphanum()
    .min(1),
  phone: joi
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-s. ]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
    .max(15),
  key_fobs: joi
    .array()
    .items(keyFobs),
});

module.exports.login = joi.object().keys({
  email: joi
    .string()
    .email()
    .required(),
  password: joi.required(),
});

module.exports.updatePassword = joi.object().keys({
  email: joi
    .string()
    .email()
    .required(),
  oldPassword: joi.required(),
  newPassword: joi.required(),
});

module.exports.getUserById = joi.object().keys({
  id: joi
    .string()
    .alphanum()
    .min(24)
    .max(24)
    .required(),
});

module.exports.getUsersByRoles = joi.object().keys({
  roles: joi
    .array()
    .items(userRoles.admin, userRoles.storeManager, userRoles.user)
    .required(),
  ...paginationConfig.pagination,
});
