const tokenService = require("./token.service");

module.exports = {
  successWithData(data, res, recordsTotal, recordsFiltered) {
    return res.json({
      status: true,
      data,
      recordsTotal,
      recordsFiltered,
    });
  },
  successWithDataAndToken(data, res) {
    return res.json({
      status: true,
      data,
      token: tokenService.generateJwt(data._id, data.email, data.role),
    });
  },
  successWithMessage(message, res) {
    return res.json({
      status: true,
      msg: message,
    });
  },
  customError(message, res) {
    return res.status(422).json({
      status: false,
      msg: message,
    });
  },
  dataNotFound(message, res) {
    return res.status(404).json({
      status: false,
      msg: message,
    });
  },
};
