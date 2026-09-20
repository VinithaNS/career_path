const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  skills: [{ type: String }],
  resources: [{ type: String }]
});

const careerRoadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    duration: {
      type: String,
      default: "12-18 Months"
    },
    steps: [stepSchema],
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerRoadmap", careerRoadmapSchema);
