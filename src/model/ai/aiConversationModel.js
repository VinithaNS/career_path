const mongoose = require("mongoose");

const aiConversationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    recommendation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIRecommendation",
      default: null
    },

    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true
        },

        message: {
          type: String,
          required: true,
          trim: true
        },

        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],

    topic: {
      type: String,
      default: "Career Guidance"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AIConversation", aiConversationSchema);
