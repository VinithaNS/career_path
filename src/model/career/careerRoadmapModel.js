const mongoose = require("mongoose");

const roadmapStepSchema = new mongoose.Schema(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    topics: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    practicePlatforms: { type: [String], default: [] },
    miniProject: { type: String, default: "" },
    estimatedDuration: { type: String, default: "3 - 4 Weeks" }
  },
  { _id: true }
);

const careerRoadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true // e.g. "Software Developer Roadmap"
    },
    description: {
      type: String
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
