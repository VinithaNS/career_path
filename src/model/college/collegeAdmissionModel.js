const mongoose = require("mongoose");

const collegeAdmissionSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeCourse",
      required: true
    },

    admissionYear: {
      type: Number,
      required: true
    },

    admissionType: {
      type: String,
      enum: [
        "Merit",
        "Entrance Exam",
        "Counselling",
        "Management Quota",
        "Direct"
      ],
      required: true
    },

    entranceExam: {
      type: String,
      trim: true
    },

    eligibility: {
      type: String,
      trim: true
    },

    minimumPercentage: {
      type: Number,
      min: 0,
      max: 100
    },

    requiredSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],

    applicationStartDate: {
      type: Date
    },

    applicationEndDate: {
      type: Date
    },

    admissionFee: {
      type: Number,
      min: 0
    },

    tuitionFee: {
      type: Number,
      min: 0
    },

    documentsRequired: [
      {
        type: String,
        trim: true
      }
    ],

    admissionProcess: [
      {
        step: Number,
        title: String,
        description: String
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

module.exports = mongoose.model("CollegeAdmission", collegeAdmissionSchema);
