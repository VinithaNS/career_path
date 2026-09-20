const mongoose = require("mongoose");

const degreeCourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true
    },
    courseCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    degreeType: {
      type: String,
      default: "UG"
    },
    stream: {
      type: String,
      default: "Engineering"
    },
    duration: {
      type: String,
      default: "4 Years"
    },
    averageSalary: {
      type: String,
      default: "₹3 - 8 LPA"
    },
    description: {
      type: String,
      default: ""
    },
    eligibility: {
      type: String,
      default: "12th standard pass with relevant subject cutoff."
    },
    admissionProcess: {
      type: String,
      default: "Merit-based university counseling & entrance tests."
    },
    subjects: [{ type: String }],
    skills: [{ type: String }],
    jobRoles: [{ type: String }],
    higherStudies: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DegreeCourse", degreeCourseSchema);
