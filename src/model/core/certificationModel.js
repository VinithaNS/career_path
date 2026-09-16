const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
  {
    certificationName: {
      type: String,
      required: true,
      trim: true
    },

    certificationCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    provider: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    certificationType: {
      type: String,
      enum: ["Professional", "Academic", "Technical", "Government", "Online"],
      default: "Professional"
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    },

    duration: {
      type: String,
      trim: true
    },

    eligibility: {
      type: String,
      trim: true
    },

    examRequired: {
      type: Boolean,
      default: false
    },

    examMode: {
      type: String,
      enum: ["Online", "Offline", "Both", "Not Applicable"],
      default: "Not Applicable"
    },

    officialUrl: {
      type: String,
      trim: true
    },

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

    relatedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DegreeCourse"
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

module.exports = mongoose.model("Certification", certificationSchema);
