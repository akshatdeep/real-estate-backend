const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  content: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const message = mongoose.model("message", MessageSchema);

module.exports = message;
