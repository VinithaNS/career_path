const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentCategory",
      required: true
    },

    instructions: {
      type: String,
      trim: true
    },

    duration: {
      type: Number,
      required: true,
      min: 1
    },

    totalQuestions: {
      type: Number,
      default: 0
    },

    passingScore: {
      type: Number,
      default: 0
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isPublished: {
      type: Boolean,
      default: false
    },

    displayOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
