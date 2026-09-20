const mongoose = require("mongoose");

const diplomaCourseSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
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
      uppercase: true,
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    stream: {
      type: String,
      default: "Engineering & Technology"
    },
    duration: {
      type: String,
      default: "3 Years"
    },
    eligibility: {
      type: String,
      default: "Pass in 10th Standard (SSLC / CBSE / ICSE) with minimum 35%"
    },
    shortDescription: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    skills: [{ type: String }],
    directJobRoles: [{ type: String }],
    lateralEntryScope: {
      eligibleForDirectSecondYearBE: { type: Boolean, default: true },
      degreeBranches: [{ type: String }]
    },
    averageSalary: {
      type: String,
      default: "₹2.4 - 4.5 LPA"
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
  { timestamps: true }
);

module.exports = mongoose.model("DiplomaCourse", diplomaCourseSchema);
