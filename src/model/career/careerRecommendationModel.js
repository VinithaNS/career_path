const mongoose = require("mongoose");

const careerRecommendationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true
    },

    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },

    matchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },

    matchedInterests: [
      {
        type: String
      }
    ],

    matchedSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],

    matchedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],

    recommendationReason: {
      type: String,
      trim: true
    },

    rank: {
      type: Number,
      default: 0
    },

    source: {
      type: String,
      enum: ["Rule Based", "Assessment", "AI", "Combined"],
      default: "Rule Based"
    },

    status: {
      type: String,
      enum: ["Active", "Saved", "Rejected"],
      default: "Active"
    },

    generatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

careerRecommendationSchema.index({
  student: 1,
  career: 1
});

module.exports = mongoose.model(
  "CareerRecommendation",
  careerRecommendationSchema
);
