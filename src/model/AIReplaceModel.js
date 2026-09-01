const mongoose = require("mongoose");

const aiReplaceSchema = new mongoose.Schema(
  {
    // ============================================
    // DOMAIN / SECTOR
    // ============================================

    sector: {
      type: String,
      required: true,
      trim: true
    },

    domain: {
      type: String,
      required: true,
      trim: true
    },

    // ============================================
    // HUMAN ROLE
    // ============================================

    humanRole: {
      type: String,
      required: true,
      trim: true
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true
    },

    // ============================================
    // AI INFORMATION
    // ============================================

    aiTechnology: {
      type: String,
      required: true,
      trim: true
    },

    aiCapability: {
      type: String,
      required: true,
      trim: true
    },

    // ============================================
    // REPLACEMENT / AUTOMATION
    // ============================================

    replacementPercentage: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },

    automationLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High"],
      required: true
    },

    replacementType: {
      type: String,
      enum: ["Human Assisted", "Partial Replacement", "Full Automation"],
      required: true
    },

    // ============================================
    // CAREER IMPACT
    // ============================================

    currentDemand: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High"],
      default: "Medium"
    },

    futureDemand: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High"],
      default: "Medium"
    },

    // ============================================
    // JOBS AT RISK
    // ============================================

    jobsAtRisk: [
      {
        type: String,
        trim: true
      }
    ],

    // ============================================
    // NEW JOBS CREATED BY AI
    // ============================================

    newJobsCreated: [
      {
        type: String,
        trim: true
      }
    ],

    // ============================================
    // FUTURE SKILLS
    // ============================================

    requiredSkills: [
      {
        type: String,
        trim: true
      }
    ],

    // ============================================
    // EXPLANATION
    // ============================================

    explanation: {
      type: String,
      required: true,
      trim: true
    },

    // ============================================
    // ADVANTAGES
    // ============================================

    benefits: [
      {
        type: String,
        trim: true
      }
    ],

    // ============================================
    // RISKS
    // ============================================

    risks: [
      {
        type: String,
        trim: true
      }
    ],

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
// INDEXES
// ============================================

aiReplaceSchema.index({
  sector: 1
});

aiReplaceSchema.index({
  domain: 1
});

aiReplaceSchema.index({
  humanRole: 1
});

aiReplaceSchema.index({
  automationLevel: 1
});

module.exports = mongoose.model("AIReplace", aiReplaceSchema);
