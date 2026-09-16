const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      trim: true
    },

    collegeCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true
    },

    description: {
      type: String,
      trim: true
    },

    collegeType: {
      type: String,
      enum: [
        "Government",
        "Private",
        "Autonomous",
        "Deemed University",
        "Government Aided"
      ],
      required: true
    },

    affiliation: {
      type: String,
      trim: true
    },

    accreditation: {
      type: String,
      trim: true
    },

    establishedYear: {
      type: Number
    },

    address: {
      type: String,
      trim: true
    },

    city: {
      type: String,
      trim: true
    },

    state: {
      type: String,
      trim: true
    },

    country: {
      type: String,
      default: "India",
      trim: true
    },

    pincode: {
      type: String,
      trim: true
    },

    website: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    phone: {
      type: String,
      trim: true
    },

    logoUrl: {
      type: String,
      default: ""
    },

    images: [
      {
        type: String
      }
    ],

    facilities: [
      {
        type: String,
        trim: true
      }
    ],

    entranceExams: [
      {
        type: String,
        trim: true
      }
    ],

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeCourse"
      }
    ],

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    totalReviews: {
      type: Number,
      default: 0
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

module.exports = mongoose.model("College", collegeSchema);
