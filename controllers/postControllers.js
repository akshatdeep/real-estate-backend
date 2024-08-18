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
  const post = await Post.findById(id).populate("userId");
  res.status(200).json(post);
});


exports.addPost = async (req, res) => {
  const tokenUserId = req.user._id;
  
  try {
    const post = new Post({
      title: req.body.title,
      price: req.body.price,
      address: req.body.address,
      city: req.body.city,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      desc: req.body.desc,
      utilities: req.body.utilities,
      pet: req.body.pet,
      income: req.body.income,
      size: req.body.size,
      school: req.body.school,
      bus: req.body.bus,
      restaurant: req.body.restaurant,
      type: req.body.type,
      property: req.body.property,
      userId: tokenUserId,
    });

    await post.save();

    res.status(201).json({
      message: "Post Created",
      post: post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create post",
      error: error.message
    });
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
