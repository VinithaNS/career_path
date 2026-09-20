const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const aiConversationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null
    },
    topic: {
      type: String,
      default: "Career Guidance"
    },
    messages: [messageSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIConversation", aiConversationSchema);
