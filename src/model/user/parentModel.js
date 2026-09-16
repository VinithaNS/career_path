const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    occupation: {
      type: String,
      trim: true,
      default: ""
    },

    alternateMobile: {
      type: String,
      trim: true,
      default: ""
    },

    address: {
      type: String,
      trim: true,
      default: ""
    },

    city: {
      type: String,
      trim: true,
      default: ""
    },

    state: {
      type: String,
      trim: true,
      default: ""
    },

    country: {
      type: String,
      trim: true,
      default: "India"
    },

    relationship: {
      type: String,
      enum: ["father", "mother", "guardian", "other"],
      default: "guardian"
    },

    profileCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
