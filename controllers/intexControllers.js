const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Register = require("../models/register");
const errorHandler = require("../utils/errrorHandler");
const { sendToken } = require("../utils/sendToken");

exports.homepage = catchAsyncError((req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

exports.registerRouter = catchAsyncError(async (req, res) => {
  const register = await new Register(req.body).save();
  sendToken(register, 200, res);
});

exports.loginRouter = catchAsyncError(async (req, res, next) => {
  const register = await Register.findOne({
    username: req.body.username,
  })
    .select("+password")
    .exec();
  if (!register) {
    return next(new errorHandler("Invalid credentials"), 404);
  }

  const isMatch = await register.comparePassword(req.body.password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials"), 404);
  }
  sendToken(register, 201, res);
  
});

exports.logoutRouter = catchAsyncError(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
