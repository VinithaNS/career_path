const mongoose = require("mongoose");

const careerRoadmapSchema = new mongoose.Schema(
  {
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    duration: {
      type: String,
      default: "",
      trim: true
    },

    steps: [
      {
        stepNumber: {
          type: Number,
          required: true
        },

        title: {
          type: String,
          required: true,
          trim: true
        },

        description: {
          type: String,
          default: "",
          trim: true
        },

        skills: [
          {
            type: String,
            trim: true
          }
        ],

        courses: [
          {
            type: String,
            trim: true
          }
        ],

        certifications: [
          {
            type: String,
            trim: true
          }
        ],

        projects: [
          {
            type: String,
            trim: true
          }
        ]
      }
    ],

    requiredSkills: [
      {
        type: String,
        trim: true
      }
    ],

    recommendedCourses: [
      {
        type: String,
        trim: true
      }
    ],

    recommendedCertifications: [
      {
        type: String,
        trim: true
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const CareerRoadmap = mongoose.model("CareerRoadmap", careerRoadmapSchema);

module.exports = CareerRoadmap;
