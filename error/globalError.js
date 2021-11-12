const sendErrorDev = (error, res) => {
    res.status(error.statusCode).json({
      success: false,
      error,
      stack: error.stack,
      msg: error.message,
    });
  };
  const handleCastError = (error) => {
    const message = `this ${error.path}: ${error.value} is not valid`;
    return new BaseError(message, 400);
  };
  const handleDuplicateError = () => {
    const message = `duplicate field entry `;
    return new BaseError(message, 400);
  };



const handleCastError = (error) => {
  const message = `this ${error.path}: ${error.value} is not valid`;
  return new AppError(message, 400);
};

const handleDuplicateError = () => {
  const message = `duplicate field entry `;
  return new AppError(message, 400);
};

const handleInvalidToken = () => new AppError('Invalid credential', 401);
const handleValidationError = (error) => {
  const message = Object.values(error.errors).join(', ');
  return new AppError(message, 400);
};

const handleExpiredToken = () =>
  new AppError('your Credential has expired. Please login again', 401);

const sendErrorProd2 = (error, res) => {
  const message = error.message || "something unexpected occur. please try again later"
  const statusCode = error.statusCode || 500
    res.status(statusCode).json({
      success: false,
      msg: message,
    });
};

if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleInvalidToken();
    if (error.name === 'TokenExpiredError') error = handleExpiredToken();
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;


const handleDuplicateError = () => {
  const message = `duplicate field entry `;
  return new AppError(message, 400);
};
const handleInvalidToken = () => new AppError('Invalid credential', 401);
const handleValidationError = (error) => {
  const message = Object.values(error.errors).join(', ');
  return new AppError(message, 400);
};
const handleExpiredToken = () =>
  new AppError('your Credential has expired. Please login again', 401);
const sendErrorProd2 = (error, res) => {
  const message = error.message || "something unexpected occur. please try again later"
  const statusCode = error.statusCode || 500
    res.status(statusCode).json({
      success: false,
      msg: message,
    });
};

if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleInvalidToken();
    if (error.name === 'TokenExpiredError') error = handleExpiredToken();
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
  