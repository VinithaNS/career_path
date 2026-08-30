const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResourceCategory",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    resourceType: {
      type: String,
      enum: ["PDF", "VIDEO", "ARTICLE", "WEBSITE", "DOCUMENT", "BOOK", "OTHER"],
      required: true
    },

    resourceUrl: {
      type: String,
      required: true,
      trim: true
    },

    thumbnailUrl: {
      type: String,
      trim: true
    },

    author: {
      type: String,
      trim: true
    },

    publishedDate: {
      type: Date
    },

    tags: [
      {
        type: String,
        trim: true
      }
    ],

    displayOrder: {
      type: Number,
      default: 0
    },

    isFeatured: {
      type: Boolean,
      default: false
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

module.exports = mongoose.model("Resource", resourceSchema);
