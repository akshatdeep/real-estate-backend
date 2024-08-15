const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Post = require("../models/post");
const errorHandler = require("../utils/errrorHandler");
const { sendToken } = require("../utils/sendToken");

exports.getAllPost = catchAsyncError(async (req, res) => {
  const post = await Post.find();
  res.status(200).json(post);
});

exports.getSinglePost = catchAsyncError(async (req, res) => {
  const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json(post);
});
exports.addPost = catchAsyncError(async (req, res) => {
  const tokenUserId = req.user._id;
  const body = req.body;

  // Log the userId and body for debugging
  console.log("tokenUserId:", tokenUserId);
  console.log("body:", body);

  try {
    const addpost = await new Post({ userId: tokenUserId, ...body }).save();
    res.status(200).json({ message: "Post created", Post: addpost });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
});

exports.updatePost = catchAsyncError((req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

exports.deletePost = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.user._id;
  
    const post = await Post.findById(id);
  
    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  
    // Check if the user is authorized to delete the post
    if (!post.userId.equals(tokenUserId)) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
  
    await Post.findByIdAndDelete(id);
  
    res.status(200).json({ message: "Post deleted!" });
  });
