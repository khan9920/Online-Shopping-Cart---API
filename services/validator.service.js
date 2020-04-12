const response = require("./response.service");
const tokenService = require("./token.service");

/**
 * Get token from header
 * @param req
 * @returns {*}
 */
module.exports.getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token")
    || (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

/**
 * Validate user role with array of granted roles
 * @param role
 * @param grantedUserRoles
 * @returns {Promise<any>}
 */
const validateUserRole = (role, grantedUserRoles) => new Promise((resolve, reject) => {
  if (
    Array.isArray(grantedUserRoles)
      && grantedUserRoles.length !== 0
      && grantedUserRoles.includes(role)
  ) {
    resolve("Granted");
  }
  else {
    reject(new Error("Unauthorized to this route."));
  }
});

/**
 * Validate API request body according to the defined schema
 * @param schema
 * @returns {Function}
 */
module.exports.validateBody = function (schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) {
      return response.customError(result.error.details[0].message, res);
    }
    next();
  };
};

/**
 * Validate JWT and API request body with defined schema
 * @param schema
 * @param grantedUserRoles
 * @returns {Function}
 */
module.exports.validateBodyWithToken = function (schema, grantedUserRoles) {
  return async (req, res, next) => {
    try {
      const jwt = this.getTokenFromHeader(req);
      const decoded = tokenService.verifyJwt(jwt);
      await validateUserRole(decoded.role, grantedUserRoles);

      const result = schema.validate(req.body);

      if (result.error) {
        return response.customError(result.error.details[0].message, res);
      }
      next();
    }
    catch (error) {
      return response.customError(`${error}`, res);
    }
  };
};

/**
 * Validate query parameters in the API request
 * @param schema
 * @returns {Function}
 */
module.exports.validateQueryParameters = function (schema) {
  return (req, res, next) => {
    const result = schema.validate(req.query);
    if (result.error) {
      return response.customError(result.error.details[0].message, res);
    }

    next();
  };
};

/**
 * Validate API request header
 * @param grantedUserRoles
 * @returns {Function}
 */
module.exports.validateHeader = function (grantedUserRoles) {
  return async (req, res, next) => {
    try {
      const jwt = this.getTokenFromHeader(req);
      const decoded = tokenService.verifyJwt(jwt);
      await validateUserRole(decoded.role, grantedUserRoles);
      next();
    }
    catch (error) {
      return response.customError(`${error}`, res);
    }
  };
};

/**
 * Get decoded data from token
 * @param req
 * @returns {Promise<*>}
 */
module.exports.getTokenInfo = (req) => {
  const jwt = this.getTokenFromHeader(req);
  return tokenService.verifyJwt(jwt);
};

/**
 * Get decoded data from token
 * @param req
 * @returns {Promise<*>}
 */
module.exports.getTokenInfo = (req) => {
  const jwt = this.getTokenFromHeader(req);
  return tokenService.verifyJwt(jwt);
};

/**
 * Validate route parameters
 * @param schema
 * @returns {function(...[*]=)}
 */
module.exports.validateRouteParameters = function (schema) {
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return response.customError(result.error.details[0].message, res);
    }
    next();
  };
};
