const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
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
    // NOTIFICATION TITLE
    // ============================================

    title: {
      type: String,
      required: true,
      trim: true
    },

    // ============================================
    // NOTIFICATION MESSAGE
    // ============================================

    message: {
      type: String,
      required: true,
      trim: true
    },

    // ============================================
    // NOTIFICATION TYPE
    // ============================================

    type: {
      type: String,
      enum: [
        "Assessment",
        "Career",
        "Roadmap",
        "Course",
        "Project",
        "Certification",
        "AI",
        "System"
      ],
      required: true
    },

    // ============================================
    // OPTIONAL REFERENCE
    // ============================================

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },

    referenceType: {
      type: String,
      enum: [
        "Career",
        "CareerRoadmap",
        "Assessment",
        "Course",
        "Project",
        "Certification",
        "AIRecommendation",
        "None"
      ],
      default: "None"
    },

    // ============================================
    // READ STATUS
    // ============================================

    isRead: {
      type: Boolean,
      default: false
    },

    readAt: {
      type: Date,
      default: null
    },

    // ============================================
    // PRIORITY
    // ============================================

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    // ============================================
    // ACTIVE STATUS
    // ============================================

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// ============================================
// INDEXES
// ============================================

notificationSchema.index({
  student: 1
});

notificationSchema.index({
  student: 1,
  isRead: 1
});

notificationSchema.index({
  createdAt: -1
});

module.exports = mongoose.model("Notification", notificationSchema);
