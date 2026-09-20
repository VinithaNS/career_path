const mongoose = require("mongoose");

// Step Sub-Schema
const roadmapStepSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    topics: {
      type: [String],
      default: []
    },
    tools: {
      type: [String],
      default: []
    },
    practicePlatforms: {
      type: [String],
      default: []
    },
    miniProject: {
      type: String,
      default: ""
    },
    estimatedDuration: {
      type: String,
      default: "3 - 4 Weeks"
    }
  },
  { _id: true }
);

// Main Career Roadmap Schema
const careerRoadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      trim: true
    },
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      default: null
    },
    steps: [roadmapStepSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerRoadmap", careerRoadmapSchema);
