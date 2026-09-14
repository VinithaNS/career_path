const mongoose = require("mongoose");

const studentProgressSchema = new mongoose.Schema(
  {
    // =========================
    // STUDENT
    // =========================
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    // =========================
    // CAREER
    // =========================
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true
    },

    // =========================
    // CAREER ROADMAP
    // =========================
    careerRoadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerRoadmap",
      default: null
    },

    // =========================
    // CURRENT STEP
    // =========================
    currentStep: {
      type: Number,
      default: 0,
      min: 0
    },

    totalSteps: {
      type: Number,
      default: 0,
      min: 0
    },

    // =========================
    // PROGRESS
    // =========================
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    completedSteps: {
      type: Number,
      default: 0,
      min: 0
    },

    // =========================
    // STATUS
    // =========================
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started"
    },

    completed: {
      type: Boolean,
      default: false
    },

    completedAt: {
      type: Date,
      default: null
    },

    // =========================
    // LAST ACCESSED
    // =========================
    lastAccessedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// ======================================
// COMPOUND INDEX
// ======================================
// One student's progress for one career
studentProgressSchema.index({
  student: 1,
  career: 1
});

// ======================================
// MODEL
// ======================================
module.exports =
  mongoose.models.StudentProgress ||
  mongoose.model("StudentProgress", studentProgressSchema);
