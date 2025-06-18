const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Post = require("../models/post");
const errorHandler = require("../utils/errrorHandler");
const { sendToken } = require("../utils/sendToken");
const PostDetail = require("../models/postDetail");
const jwt = require("jsonwebtoken")
const Register = require("../models/register")

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



// exports.SavedPost = catchAsyncError(async (req, res) => {
//   const userId = req.user._id;
//   const { postId } = req.body;

//   if (!postId) {
//     return res.status(400).json({ message: "Post ID is required" });
//   }

//   // Optional: validate post exists
//   const postExists = await Post.findById(postId);
//   if (!postExists) {
//     return res.status(404).json({ message: "Post not found" });
//   }

//   const user = await User.findById(userId);

//   const isAlreadySaved = user.savedPosts.includes(postId);

//   if (isAlreadySaved) {
//     user.savedPosts.pull(postId);
//     await user.save();
//     return res.status(200).json({ message: "Post unsaved", isSaved: false });
//   } else {
//     user.savedPosts.push(postId);
//     await user.save();
//     return res.status(200).json({ message: "Post saved", isSaved: true });
//   }
// });

exports.SavedPost = catchAsyncError(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  // Validate post exists
  const postExists = await Post.findById(postId);
  if (!postExists) {
    return res.status(404).json({ message: "Post not found" });
  }

  const user = await User.findById(userId);

  const isAlreadySaved = user.savedPosts.some(
    (savedPostId) => savedPostId.toString() === postId
  );

  if (isAlreadySaved) {
    user.savedPosts.pull(postId);
    await user.save();
    return res.status(200).json({ message: "Post unsaved", isSaved: false });
  } else {
    user.savedPosts.push(postId);
    await user.save();
    return res.status(200).json({ message: "Post saved", isSaved: true });
  }
});



exports.getUserProfilePosts = catchAsyncError(async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID:", userId);

    const user = await Register.findById(userId).populate("savedPosts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await Post.find({ userId });

    res.status(200).json({
      userPosts,
      savedPosts: user.savedPosts,
    });
  } catch (err) {
    console.error("Error in getUserProfilePosts:", err);
    res.status(500).json({ message: "Failed to load profile posts" });
  }
});





