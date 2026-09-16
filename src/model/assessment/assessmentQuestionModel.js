const mongoose = require("mongoose");

const assessmentQuestionSchema = new mongoose.Schema(
  {
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentCategory",
      required: true
    },

    questionText: {
      type: String,
      required: true,
      trim: true
    },

    questionType: {
      type: String,
      enum: [
        "MCQ",
        "TrueFalse",
        "MultipleSelect"
      ],
      default: "MCQ"
    },

    options: [
      {
        optionText: {
          type: String,
          required: true,
          trim: true
        },

        optionValue: {
          type: String,
          required: true,
          trim: true
        }
      }
    ],

    correctAnswer: {
      type: String,
      required: true,
      trim: true
    },

    explanation: {
      type: String,
      trim: true
    },

    marks: {
      type: Number,
      default: 1,
      min: 1
    },

    difficulty: {
      type: String,
      enum: [
        "Easy",
        "Medium",
        "Hard"
      ],
      default: "Medium"
    },

    displayOrder: {
      type: Number,
      default: 0
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

module.exports = mongoose.model(
  "AssessmentQuestion",
  assessmentQuestionSchema
);