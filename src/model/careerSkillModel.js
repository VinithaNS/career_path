const mongoose = require("mongoose");

const careerSkillSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true
    },

    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true
    },

    importance: {
      type: String,
      enum: ["Beginner", "Important", "Required", "Advanced"],
      default: "Important"
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner"
    },

    priority: {
      type: Number,
      default: 1
    },

    isCoreSkill: {
      type: Boolean,
      default: false
    },

    description: {
      type: String,
      trim: true
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

careerSkillSchema.index(
  {
    career: 1,
    skill: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model("CareerSkill", careerSkillSchema);
