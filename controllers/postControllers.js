const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Post = require("../models/post");
const errorHandler = require("../utils/errrorHandler");
const { sendToken } = require("../utils/sendToken");
const PostDetail = require("../models/postDetail");

exports.getAllPost = catchAsyncError(async (req, res) => {
  const post = await Post.find();
  res.status(200).json(post);
});

exports.getSinglePost = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate("postDetail", "Register");
  res.status(200).json(post);
});

exports.addPost = async (req, res) => {
  const userId = req.user.id;
  try {
    const {
      title,
      price,
      images,
      address,
      city,
      bedroom,
      bathroom,
      latitude,
      longitude,
      type,
      property,
      postDetail,
      savedPosts,
    } = req.body;

    const newPost = new Post({
      title,
      price,
      images,
      address,
      city,
      bedroom,
      bathroom,
      latitude,
      longitude,
      type,
      property,
      userId, // Directly use the userId from req.user._id
      postDetail,
      savedPosts,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
  
};



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
