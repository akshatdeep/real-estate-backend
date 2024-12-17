const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Post = require("../models/post");
const errorHandler = require("../utils/errrorHandler");
const { sendToken } = require("../utils/sendToken");
const PostDetail = require("../models/postDetail");
const jwt = require("jsonwebtoken")

exports.getAllPost = catchAsyncError(async (req, res) => {
  const query = req.query;
  console.log(query);

  const post = await Post.find();
  res.status(200).json(post);
});

exports.getSinglePost = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const post = await Post.findById(id)
    .populate({
      path: "userId",
      select: "username avatar", // Select specific fields from the user
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(200).json({ ...post.toObject(), isSaved: false });
        }

        const saved = await SavedPost.findOne({
          userId: payload.id,
          postId: id,
        });

        return res.status(200).json({
          ...post.toObject(),
          isSaved: saved ? true : false,
        });
      });
    } else {
      res.status(200).json({ ...post.toObject(), isSaved: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get post" });
  }
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
      images: req.body.images,
      userId: tokenUserId,
    });

    await post.save();

    res.status(201).json({
      message: "Post Created",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
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
