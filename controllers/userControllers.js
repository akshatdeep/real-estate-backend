const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
const SavedPost = require("../models/savePost");
const jwt = require("jsonwebtoken")
// const upload = require("../utils/multer")

exports.getAllUsers = catchAsyncError(async (req, res) => {
  const user = await Register.find();
  res.status(200).json(user);
});

exports.getUsers = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const user = await Register.findById(id);
  res.status(200).json(user);
});

exports.getUpdateUsers = [
  catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const { password, ...inputs } = req.body;

    if (id !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    let updateData = { ...inputs };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updateUser = await Register.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(updateUser);
  }),
];

exports.DeleteUsers = catchAsyncError(async (req, res) => {
  const id = req.params.id;

  const user = await Register.findByIdAndDelete(id);

  if (!user) {
    return res.status(401).json("User Not Found");
  }

  res.status(200).json({ meaage: "user Deleted" });
});

exports.savePost = catchAsyncError(async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.user.id;
  console.log(tokenUserId)

  try {
    // Check if the post is already saved
    const savedPost = await SavedPost.findOne({ userId: tokenUserId, postId });

    if (savedPost) {
      // If the post is already saved, remove it
      await SavedPost.deleteOne({ _id: savedPost._id });
      return res.status(200).json({ message: "Post removed from saved list" });
    } else {
      // If the post is not saved, save it
      const newSavedPost = new SavedPost({
        userId: tokenUserId,
        postId,
      });
      await newSavedPost.save();
      return res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save or remove the post!" });
  }
})

exports.profilePost = catchAsyncError(async (req, res) => {
  const id = req.params.id;

  const user = await Register.findByIdAndDelete(id);

  if (!user) {
    return res.status(401).json("User Not Found");
  }

  res.status(200).json({ meaage: "user Deleted" });
});