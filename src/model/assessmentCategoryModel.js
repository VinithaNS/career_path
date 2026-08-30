const mongoose = require("mongoose");

const assessmentCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    description: {
      type: String,
      trim: true
    },

    instructions: {
      type: String,
      trim: true
    },

    icon: {
      type: String,
      trim: true
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

module.exports = mongoose.model("AssessmentCategory", assessmentCategorySchema);
