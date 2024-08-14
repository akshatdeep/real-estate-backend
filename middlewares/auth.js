const jwt = require("jsonwebtoken");

const errorHandler = require("../utils/errrorHandler");
const { catchAsyncError } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return next(new errorHandler("Not Authenticated"), 401);
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  res.json({ id, token });
});
