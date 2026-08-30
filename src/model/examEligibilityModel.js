const mongoose = require("mongoose");

const examEligibilitySchema = new mongoose.Schema(
  {
    governmentExam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GovernmentExam",
      required: true
    },

    eligibilityTitle: {
      type: String,
      required: true,
      trim: true
    },

    educationalQualification: {
      type: String,
      required: true,
      trim: true
    },

    minimumQualification: {
      type: String,
      trim: true
    },

    ageLimit: {
      minimum: {
        type: Number
      },

      maximum: {
        type: Number
      }
    },

    ageRelaxation: {
      type: String,
      trim: true
    },

    nationality: {
      type: String,
      trim: true
    },

    requiredSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],

    eligibleStreams: [
      {
        type: String,
        trim: true
      }
    ],

    eligibleCategories: [
      {
        type: String,
        trim: true
      }
    ],

    workExperienceRequired: {
      type: Boolean,
      default: false
    },

    workExperience: {
      type: String,
      trim: true
    },

    additionalRequirements: [
      {
        type: String,
        trim: true
      }
    ],

    description: {
      type: String,
      trim: true
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

module.exports = mongoose.model("ExamEligibility", examEligibilitySchema);
