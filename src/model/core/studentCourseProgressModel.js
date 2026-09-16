const mongoose = require("mongoose");

const studentCourseProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeCourse",
      required: true
    },

    currentYear: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    },

    overallProgress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },

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

    internship: {
      completed: {
        type: Boolean,
        default: false
      },

      title: {
        type: String,
        trim: true
      },

      company: {
        type: String,
        trim: true
      },

      duration: {
        type: String,
        trim: true
      }
    },

    academicPerformance: {
      percentage: {
        type: Number,
        min: 0,
        max: 100
      },

      cgpa: {
        type: Number,
        min: 0,
        max: 10
      }
    },

    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started"
    },

    notes: {
      type: String,
      trim: true
    },

    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

studentCourseProgressSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model(
  "StudentCourseProgress",
  studentCourseProgressSchema
);
