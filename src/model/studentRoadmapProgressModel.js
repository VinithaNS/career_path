const mongoose = require("mongoose");

const studentRoadmapProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeYearRoadmap",
      required: true
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    },

    completedGoals: [
      {
        type: String,
        trim: true
      }
    ],

    completedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],

    completedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ],

    completedCertifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification"
      }
    ],

    completedActivities: [
      {
        type: String,
        trim: true
      }
    ],

    progressPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },

    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started"
    },

    startedAt: {
      type: Date
    },

    completedAt: {
      type: Date
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

studentRoadmapProgressSchema.index(
  { student: 1, roadmap: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "StudentRoadmapProgress",
  studentRoadmapProgressSchema
);
