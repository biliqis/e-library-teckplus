
const BaseError = require("../../error/BaseError")

module.exports.useBodyValidator = schema => {
  return async (req, res, next) => {
    try {
      const data = await schema
        .unknown(false)
        .validateAsync(req.body, { stripUnknown: true });
      req.body = data;
      next();
    } catch (e) {
      const message = e.details[0].message;
      return next(new BaseError(message, 404));
    }
  };
};

module.exports.useQueryValidator = schema => {
    return async (req, res, next) => {
      try {
        const data = await schema
          .unknown(false)
          .validateAsync(req.query, { stripUnknown: true });
        req.query = data;
        next();
      } catch (e) {
        const message = e.details[0].message;
        return next(new BaseError(message, 404));
      }
    };
  };