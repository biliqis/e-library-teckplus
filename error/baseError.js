// baseError.js
const baseError = require("../error/globalError")
class BaseError extends Error {
    constructor (statusCode, description) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.statusCode = statusCode
    Error.captureStackTrace(this)
    }
   }
   module.exports = BaseError