const mongoose = require("mongoose");

const examSyllabusSchema = new mongoose.Schema(
  {
    governmentExam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GovernmentExam",
      required: true
    },

    syllabusTitle: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    subjects: [
      {
        subjectName: {
          type: String,
          required: true,
          trim: true
        },

        topics: [
          {
            type: String,
            trim: true
          }
        ],

        marks: {
          type: Number,
          default: 0
        },

        duration: {
          type: String,
          trim: true
        }
      }
    ],

    examPattern: {
      totalMarks: {
        type: Number,
        default: 0
      },

      totalQuestions: {
        type: Number,
        default: 0
      },

      duration: {
        type: String,
        trim: true
      },

      negativeMarking: {
        type: Boolean,
        default: false
      },

      negativeMarkingDetails: {
        type: String,
        trim: true
      }
    },

    preparationTips: [
      {
        type: String,
        trim: true
      }
    ],

    recommendedBooks: [
      {
        type: String,
        trim: true
      }
    ],

    syllabusPdf: {
      type: String,
      default: ""
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

module.exports = mongoose.model("ExamSyllabus", examSyllabusSchema);
