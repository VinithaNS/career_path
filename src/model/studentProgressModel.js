const mongoose = require("mongoose");

const studentProgressSchema = new mongoose.Schema(
  {
    // ============================================
    // STUDENT
    // ============================================

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    // ============================================
    // CAREER
    // ============================================

    selectedCareer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      default: null
    },

    // ============================================
    // ASSESSMENT PROGRESS
    // ============================================

    assessmentCompleted: {
      type: Boolean,
      default: false
    },

    assessmentAttempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentAttempt",
      default: null
    },

    assessmentResult: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentResult",
      default: null
    },

    // ============================================
    // CAREER ROADMAP
    // ============================================

    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerRoadmap",
      default: null
    },

    roadmapProgress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },

    // ============================================
    // COURSE PROGRESS
    // ============================================

    coursesStarted: {
      type: Number,
      default: 0,
      min: 0
    },

    coursesCompleted: {
      type: Number,
      default: 0,
      min: 0
    },

    // ============================================
    // PROJECT PROGRESS
    // ============================================

    projectsStarted: {
      type: Number,
      default: 0,
      min: 0
    },

    projectsCompleted: {
      type: Number,
      default: 0,
      min: 0
    },

    // ============================================
    // CERTIFICATION PROGRESS
    // ============================================

    certificationsCompleted: {
      type: Number,
      default: 0,
      min: 0
    },

    // ============================================
    // SKILLS
    // ============================================

    skillsCompleted: [
      {
        type: String,
        trim: true
      }
    ],

    skillsInProgress: [
      {
        type: String,
        trim: true
      }
    ],

    // ============================================
    // OVERALL PROGRESS
    // ============================================

    overallProgress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },

    // ============================================
    // CURRENT STAGE
    // ============================================

    currentStage: {
      type: String,
      enum: [
        "Not Started",
        "Assessment",
        "Career Selection",
        "Roadmap",
        "Learning",
        "Projects",
        "Certification",
        "Completed"
      ],
      default: "Not Started"
    },

    // ============================================
    // LAST ACTIVITY
    // ============================================

    lastActivity: {
      type: String,
      default: ""
    },

    lastActivityDate: {
      type: Date,
      default: Date.now
    },

    // ============================================
    // STATUS
    // ============================================

    status: {
      type: String,
      enum: ["Active", "Completed", "Paused"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

// ============================================
// INDEX
// ============================================

studentProgressSchema.index({
  student: 1
});

studentProgressSchema.index({
  selectedCareer: 1
});

studentProgressSchema.index({
  currentStage: 1
});

// ============================================
// ONE PROGRESS RECORD PER STUDENT
// ============================================

studentProgressSchema.index(
  {
    student: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model("StudentProgress", studentProgressSchema);
