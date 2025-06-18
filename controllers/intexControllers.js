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
  const { username, password } = req.body;

  // 1. Find user by username
  const user = await Register.findOne({ username }).select("+password").populate("savedPosts");
  if (!user) {
    return next(new errorHandler("Invalid credentials", 404));
  }

  // 2. Match password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 404));
  }

  // 3. Send token with populated user
  sendToken(user, 200, res);
});

exports.logoutRouter = catchAsyncError(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
