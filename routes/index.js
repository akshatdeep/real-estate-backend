const express = require("express");
const {
  homepage,
  registerRouter,
  loginRouter,
  logoutRouter,
} = require("../controllers/intexControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// GET /
router.get("/", isAuthenticated, homepage);

// POST register/users

router.post("/register/users", registerRouter);

// POST login/users

router.post("/login/users", loginRouter);

// POST logout/users
router.post("/logout/users", logoutRouter);

module.exports = router; 
