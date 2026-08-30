const mongoose = require("mongoose");

const collegeCourseSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true
    },

    courseName: {
      type: String,
      required: true,
      trim: true
    },

    courseCode: {
      type: String,
      trim: true,
      uppercase: true
    },

    courseType: {
      type: String,
      enum: ["UG", "PG", "Diploma", "Certificate", "PhD"],
      required: true
    },

    degree: {
      type: String,
      trim: true
    },

    specialization: {
      type: String,
      trim: true
    },

    duration: {
      type: String,
      required: true,
      trim: true
    },

    eligibility: {
      type: String,
      trim: true
    },

    minimumPercentage: {
      type: Number,
      default: 0
    },

    entranceExam: [
      {
        type: String,
        trim: true
      }
    ],

    admissionProcess: {
      type: String,
      trim: true
    },

    totalSeats: {
      type: Number,
      default: 0
    },

    annualFees: {
      type: Number,
      default: 0
    },

    tuitionFees: {
      type: Number,
      default: 0
    },

    hostelFees: {
      type: Number,
      default: 0
    },

    otherFees: {
      type: Number,
      default: 0
    },

    courseDescription: {
      type: String,
      trim: true
    },

    careerOpportunities: [
      {
        type: String,
        trim: true
      }
    ],

    syllabus: [
      {
        type: String,
        trim: true
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
  {
    timestamps: true
  }
);

module.exports = mongoose.model("CollegeCourse", collegeCourseSchema);
