const mongoose = require('mongoose');

const savedPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields.
});

savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost = mongoose.model('SavedPost', savedPostSchema);

module.exports = SavedPost;
