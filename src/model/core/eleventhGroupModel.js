const mongoose = require("mongoose");

const eleventhGroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true
    },
    groupCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    subjects: [
      {
        type: String
      }
    ],
    eligibility: {
      type: String,
      default:
        "Students who have completed 10th standard with the required marks."
    },
    courseOptions: [
      {
        type: String
      }
    ],
    careerOptions: [
      {
        type: String
      }
    ],
    suitableCollegeDepartments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
      }
    ],
    displayOrder: {
      type: Number,
      default: 1
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EleventhGroup", eleventhGroupSchema);
