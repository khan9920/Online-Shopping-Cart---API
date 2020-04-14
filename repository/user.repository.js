const Model = require("../models/user.model");

/**
 * Save new user
 * @param body
 * @returns {Promise<any>}
 */
module.exports.save = (body) => new Promise((resolve, reject) => {
  body
    .save()
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

/**
 * Find a user
 * @param query
 * @param projection
 * @returns {Promise<any>}
 */
module.exports.findOne = (query, projection) => new Promise((resolve, reject) => {
  Model
    .findOne(query, projection)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

/**
 * Find many users
 * @param query
 * @param projection
 * @returns {Promise<[]>}
 */
module.exports.findMany = (query, projection) => new Promise((resolve, reject) => {
  Model
    .find(query, projection)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

/**
 * Find users by aggregate query
 * @param query
 * @returns {Promise<unknown>}
 */
module.exports.findByAggregateQuery = (query) => new Promise((resolve, reject) => {
  Model
    .aggregate(query)
    .allowDiskUse(true)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

/**
 * Update user
 * @param query
 * @param body
 * @param options
 * @returns {Promise<unknown>}
 */
module.exports.updateUser = (query, body, options) => new Promise((resolve, reject) => {
  Model
    .findOneAndUpdate(query, body, options)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});
