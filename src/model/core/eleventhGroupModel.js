const mongoose = require("mongoose");

const eleventhGroupSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    groupName: {
      type: String,
      required: true,
      trim: true
    },

    groupCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    description: {
      type: String,
      trim: true
    },

    subjects: [
      {
        type: String,
        trim: true
      }
    ],

    eligibility: {
      type: String,
      trim: true
    },

    careerOptions: [
      {
        type: String,
        trim: true
      }
    ],

    courseOptions: [
      {
        type: String,
        trim: true
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

module.exports = mongoose.model("EleventhGroup", eleventhGroupSchema);
