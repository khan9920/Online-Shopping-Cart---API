const joi = require("@hapi/joi");
const config = require("./config");
const sortingConfig = require("./sort.config");

module.exports.pagination = {
  limit: joi
    .number()
    .integer()
    .min(0),
  page: joi
    .number()
    .integer()
    .min(1),
  search: joi.string().allow("", null),
  building_id: joi
    .string()
    .alphanum()
    .allow("", null),
  column: joi
    .number()
    .integer()
    .min(-1),
  order: joi
    .string()
    .valid(sortingConfig.sortingOrder.ascending, sortingConfig.sortingOrder.descending, null, ""),
  status: joi
    .string()
    .valid(config.status.active, config.status.deactive, config.status.all, null, ""),
};
