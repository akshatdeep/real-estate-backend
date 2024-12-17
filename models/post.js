const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bedroom: {
    type: Number,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    default:"no latitude given" 
  },
  longitude: {
    type: Number,
    default:"no longitude given"
  },
  desc: {
    type: String,
    required: true,
  },
  utilities: {
    type: String,
  },
  pet: {
    type: String,
  },
  income: {
    type: String,
  },
  size: {
    type: Number,
  },
  school: {
    type: Number,
  },
  bus: {
    type: Number,
  },
  restaurant: {
    type: Number,
  },
  type: {
    type: String,
    enum: ["buy", "rent"],
    required: true,
  },
  property: {
    type: String,
    enum: ["apartment", "house", "condo", "land"],
    required: true,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SavedPost",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
