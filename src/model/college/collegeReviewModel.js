const mongoose = require("mongoose");

const collegeReviewSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true
    },

    studentName: {
      type: String,
      required: true,
      trim: true
    },

    studentEmail: {
      type: String,
      trim: true,
      lowercase: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeCourse",
      default: null
    },

    graduationYear: {
      type: Number
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    review: {
      type: String,
      required: true,
      trim: true
    },

    pros: [
      {
        type: String,
        trim: true
      }
    ],

    cons: [
      {
        type: String,
        trim: true
      }
    ],

    placementRating: {
      type: Number,
      min: 1,
      max: 5
    },

    facultyRating: {
      type: Number,
      min: 1,
      max: 5
    },

    infrastructureRating: {
      type: Number,
      min: 1,
      max: 5
    },

    campusLifeRating: {
      type: Number,
      min: 1,
      max: 5
    },

    verified: {
      type: Boolean,
      default: false
    },

    isApproved: {
      type: Boolean,
      default: true
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

module.exports = mongoose.model("CollegeReview", collegeReviewSchema);
