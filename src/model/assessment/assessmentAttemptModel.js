const mongoose = require("mongoose");

const assessmentAttemptSchema = new mongoose.Schema(
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

    startedAt: {
      type: Date,
      default: Date.now
    },

    submittedAt: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ["InProgress", "Completed", "Abandoned"],
      default: "InProgress"
    },

    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AssessmentQuestion",
          required: true
        },

        selectedAnswer: {
          type: String,
          default: null
        },

        isCorrect: {
          type: Boolean,
          default: false
        },

        marksObtained: {
          type: Number,
          default: 0
        }
      }
    ],

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

    timeTaken: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AssessmentAttempt", assessmentAttemptSchema);
