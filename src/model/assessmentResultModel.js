const mongoose = require("mongoose");

const assessmentResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true
    },

    attempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentAttempt",
      required: true,
      unique: true
    },

    totalQuestions: {
      type: Number,
      default: 0
    },

    answeredQuestions: {
      type: Number,
      default: 0
    },

    correctAnswers: {
      type: Number,
      default: 0
    },

    wrongAnswers: {
      type: Number,
      default: 0
    },

    skippedQuestions: {
      type: Number,
      default: 0
    },

    totalMarks: {
      type: Number,
      default: 0
    },

    obtainedMarks: {
      type: Number,
      default: 0
    },

    percentage: {
      type: Number,
      default: 0
    },

    passingScore: {
      type: Number,
      default: 0
    },

    resultStatus: {
      type: String,
      enum: ["Passed", "Failed"],
      default: "Failed"
    },

    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AssessmentResult", assessmentResultSchema);
