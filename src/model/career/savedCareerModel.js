const mongoose = require("mongoose");

const savedCareerSchema = new mongoose.Schema(
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

    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true
    },

    // ============================================
    // OPTIONAL NOTE
    // ============================================

    notes: {
      type: String,
      trim: true,
      default: ""
    },

    // ============================================
    // STATUS
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
// PREVENT DUPLICATE SAVED CAREER
// ============================================

savedCareerSchema.index(
  {
    student: 1,
    career: 1
  },
  {
    unique: true
  }
);

// ============================================
// OTHER INDEXES
// ============================================

savedCareerSchema.index({
  student: 1
});

savedCareerSchema.index({
  career: 1
});

module.exports = mongoose.model("SavedCareer", savedCareerSchema);
