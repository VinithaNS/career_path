const mongoose = require("mongoose");

const aiSupportSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIConversation",
      default: null
    },

    category: {
      type: String,
      enum: [
        "Career Guidance",
        "Course Guidance",
        "Skill Guidance",
        "Assessment Help",
        "Technical Support",
        "General"
      ],
      default: "General"
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    aiResponse: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Open", "Resolved", "Pending"],
      default: "Open"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    resolvedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AISupport", aiSupportSchema);
