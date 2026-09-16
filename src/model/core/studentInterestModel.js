const mongoose = require("mongoose");

const studentInterestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true
    },

    interests: [
      {
        name: {
          type: String,
          required: true,
          trim: true
        },

        category: {
          type: String,
          trim: true
        },

        level: {
          type: String,
          enum: ["Low", "Medium", "High"],
          default: "Medium"
        },

        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 50
        }
      }
    ],

    preferredSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],

    preferredCareerCategories: [
      {
        type: String,
        trim: true
      }
    ],

    preferredWorkType: {
      type: String,
      enum: ["Office", "Remote", "Hybrid", "Field", "Laboratory", "Any"],
      default: "Any"
    },

    preferredStudyLevel: {
      type: String,
      enum: ["Diploma", "UG", "PG", "Any"],
      default: "Any"
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

module.exports = mongoose.model("StudentInterest", studentInterestSchema);
