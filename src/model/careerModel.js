const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null
    },

    careerName: {
      type: String,
      required: true,
      trim: true
    },

    careerCode: {
      type: String,
      trim: true,
      uppercase: true
    },

    shortDescription: {
      type: String,
      default: "",
      trim: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    careerImage: {
      type: String,
      default: ""
    },

    eligibility: {
      type: String,
      default: "",
      trim: true
    },

    educationRequired: [
      {
        type: String,
        trim: true
      }
    ],

    requiredSkills: [
      {
        type: String,
        trim: true
      }
    ],

    jobRoles: [
      {
        type: String,
        trim: true
      }
    ],

    averageSalary: {
      type: String,
      default: "",
      trim: true
    },

    salaryRange: {
      min: {
        type: Number,
        default: 0
      },

      max: {
        type: Number,
        default: 0
      }
    },

    careerScope: {
      type: String,
      default: "",
      trim: true
    },

    relatedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DegreeCourse"
      }
    ],

    relatedCertifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification"
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

const Career = mongoose.model("Career", careerSchema);

module.exports = Career;
