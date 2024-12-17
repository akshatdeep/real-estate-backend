const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegisterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type:[String],
    default: null, // or you can set it as String if you want to enforce it
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Reference to Post model
    },
  ],
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SavedPost", // Reference to SavedPost model
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Reference to Chat model
    },
  ],
  chatIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Reference to Chat model
    },
  ],
});

RegisterSchema.pre("save", async function () {
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

RegisterSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

RegisterSchema.methods.getjettoken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const Register = mongoose.model("Register", RegisterSchema);

module.exports = Register;
