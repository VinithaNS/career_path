const mongoose = require("mongoose");

const skillRoadmapSchema = new mongoose.Schema(
  {
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true
    },

    roadmapTitle: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    },

    estimatedDuration: {
      type: String,
      trim: true
    },

    prerequisites: [
      {
        type: String,
        trim: true
      }
    ],

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
          trim: true
        },

        topics: [
          {
            type: String,
            trim: true
          }
        ],

        duration: {
          type: String,
          trim: true
        }
      }
    ],

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ],

    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource"
      }
    ],

    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification"
      }
    ],

    relatedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ],

    imageUrl: {
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

module.exports = mongoose.model("SkillRoadmap", skillRoadmapSchema);
