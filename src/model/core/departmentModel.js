const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    iconUrl: {
      type: String,
      default: ""
    },
    eligibleEleventhGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EleventhGroup"
      }
    ],
    degreeCoursesOffered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DegreeCourse"
      }
    ],
    careerRoadmaps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CareerRoadmap"
      }
    ],
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
