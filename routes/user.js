const express = require("express");
const {
  getAllUsers,
  getUpdateUsers,
  DeleteUsers,
  getUsers,
  savePost,
  profilePost
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/getAll", getAllUsers);

// router.get("/getuser/:id", isAuthenticated, getUsers);

router.post("/updateUser/:id", isAuthenticated, getUpdateUsers);
router.post("/savePost", isAuthenticated, savePost);
router.post("/deleteUser/:id", isAuthenticated, DeleteUsers);
router.post("/profilePost/", isAuthenticated, profilePost);

module.exports = router;
