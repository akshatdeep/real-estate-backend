const express = require("express");
const {
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  addPost,
} = require("../controllers/postControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/getAllPost", getAllPost);
router.get("/post/:id", getSinglePost);
router.post("/addPost",isAuthenticated, addPost);
router.post("/updatePost/:id",isAuthenticated, updatePost);
router.post("/deletePost/:id",isAuthenticated, deletePost);

module.exports = router;
