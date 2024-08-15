const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errrorHandler");
const { catchAsyncError } = require("./catchAsyncError");
const Register = require("../models/register");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler("Not Authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Register.findById(decoded.id);

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  req.user = user;
  next();
});
