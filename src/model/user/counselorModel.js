const mongoose = require("mongoose");

const counselorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    qualification: {
      type: String,
      required: true,
      trim: true
    },

    specialization: {
      type: String,
      trim: true,
      default: ""
    },

    experience: {
      type: Number,
      default: 0,
      min: 0
    },

    organization: {
      type: String,
      trim: true,
      default: ""
    },

    designation: {
      type: String,
      trim: true,
      default: "Career Counselor"
    },

    subjects: [
      {
        type: String,
        trim: true
      }
    ],

    bio: {
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

    profileCompleted: {
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

const Counselor = mongoose.model("Counselor", counselorSchema);

module.exports = Counselor;
