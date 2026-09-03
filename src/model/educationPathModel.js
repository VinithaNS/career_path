const mongoose = require("mongoose");

const educationPathSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    startingLevel: {
      type: String,
      enum: ["10th", "11th", "12th", "Diploma", "UG", "PG"],
      required: true
    },

    description: {
      type: String,
      trim: true
    },

    steps: [
      {
        title: {
          type: String,
          required: true
        },

        type: {
          type: String,
          enum: ["School", "Group", "Diploma", "Degree", "Career", "Skill"]
        },

        referenceId: {
          type: mongoose.Schema.Types.ObjectId
        },

        duration: {
          type: String
        },

        description: {
          type: String
        },

        order: {
          type: Number
        }
      }
    ],

    careers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("EducationPath", educationPathSchema);
