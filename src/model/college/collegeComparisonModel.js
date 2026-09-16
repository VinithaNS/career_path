const mongoose = require("mongoose");

const collegeComparisonSchema = new mongoose.Schema(
  {
    comparisonName: {
      type: String,
      required: true,
      trim: true
    },

    colleges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true
      }
    ],

    selectedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeCourse"
      }
    ],

    comparisonCriteria: [
      {
        type: String,
        enum: [
          "Fees",
          "Courses",
          "Rating",
          "Placements",
          "Facilities",
          "Location",
          "Admission",
          "Infrastructure"
        ]
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
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

module.exports = mongoose.model("CollegeComparison", collegeComparisonSchema);
