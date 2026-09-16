const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: true,
      trim: true
    },

    skillCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },

    description: {
      type: String,
      trim: true
    },

    skillType: {
      type: String,
      enum: ["Technical", "Soft Skill", "Business", "Creative", "Management"],
      default: "Technical"
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner"
    },

    prerequisites: [
      {
        type: String,
        trim: true
      }
    ],

    learningTopics: [
      {
        type: String,
        trim: true
      }
    ],

    relatedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ],

    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification"
      }
    ],

    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource"
      }
    ],

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
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

module.exports = mongoose.model("Skill", skillSchema);
