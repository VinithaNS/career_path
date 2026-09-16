const mongoose = require("mongoose");

const aiRecommendationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    assessmentResult: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentResult",
      required: true
    },

    recommendedCareers: [
      {
        career: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Career",
          required: true
        },

        matchPercentage: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        },

        reason: {
          type: String,
          default: ""
        },

        strengths: [
          {
            type: String
          }
        ],

        skillsToDevelop: [
          {
            type: String
          }
        ]
      }
    ],

    overallRecommendation: {
      type: String,
      default: ""
    },

    studentStrengths: [
      {
        type: String
      }
    ],

    recommendedSkills: [
      {
        type: String
      }
    ],

    suggestedLearningPath: [
      {
        type: String
      }
    ],

    aiGenerated: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["Generated", "Pending", "Failed"],
      default: "Generated"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AIRecommendation", aiRecommendationSchema);
