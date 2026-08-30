const mongoose = require("mongoose");

const diplomaCourseSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    courseName: {
      type: String,
      required: true,
      trim: true
    },

    courseCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    shortDescription: {
      type: String,
      trim: true
    },

    description: {
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
      required: true,
      trim: true
    },

    admissionProcess: {
      type: String,
      trim: true
    },

    subjects: [
      {
        type: String,
        trim: true
      }
    ],

    skills: [
      {
        type: String,
        trim: true
      }
    ],

    careerOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ],

    colleges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College"
      }
    ],

    averageSalary: {
      type: String,
      trim: true
    },

    jobRoles: [
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

module.exports = mongoose.model("DiplomaCourse", diplomaCourseSchema);
