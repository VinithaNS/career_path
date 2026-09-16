const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true
    },

    projectCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    shortDescription: {
      type: String,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    projectType: {
      type: String,
      enum: [
        "Academic",
        "Personal",
        "Mini Project",
        "Major Project",
        "Industry",
        "Portfolio"
      ],
      default: "Personal"
    },

    difficultyLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    },

    estimatedDuration: {
      type: String,
      trim: true
    },

    technologies: [
      {
        type: String,
        trim: true
      }
    ],

    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],

    relatedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ],

    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification"
      }
    ],

    prerequisites: [
      {
        type: String,
        trim: true
      }
    ],

    learningOutcomes: [
      {
        type: String,
        trim: true
      }
    ],

    projectSteps: [
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
        }
      }
    ],

    githubUrl: {
      type: String,
      trim: true
    },

    demoUrl: {
      type: String,
      trim: true
    },

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

module.exports = mongoose.model("Project", projectSchema);
