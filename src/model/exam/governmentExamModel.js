const mongoose = require("mongoose");

const governmentExamSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
      trim: true
    },

    examCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    conductingAuthority: {
      type: String,
      required: true,
      trim: true
    },

    examType: {
      type: String,
      enum: [
        "Central Government",
        "State Government",
        "Banking",
        "Railway",
        "Defence",
        "Teaching",
        "Other"
      ],
      required: true
    },

    description: {
      type: String,
      trim: true
    },

    eligibility: {
      type: String,
      trim: true
    },

    qualification: {
      type: String,
      trim: true
    },

    ageLimit: {
      type: String,
      trim: true
    },

    applicationMode: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online"
    },

    examMode: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      default: "Online"
    },

    officialWebsite: {
      type: String,
      trim: true
    },

    applicationFee: {
      type: String,
      trim: true
    },

    examFrequency: {
      type: String,
      trim: true
    },

    relatedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ],

    relatedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
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

module.exports = mongoose.model("GovernmentExam", governmentExamSchema);
