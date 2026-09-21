const mongoose = require("mongoose");

const degreeCourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
      trim: true // e.g. "B.Sc Computer Science", "B.E Computer Science"
    },
    courseCode: {
      type: String,
      required: true,
      uppercase: true
    },
    degreeType: {
      type: String,
      enum: ["UG", "PG", "Integrated", "Diploma"],
      default: "UG"
    },
    duration: {
      type: String,
      default: "3 Years"
    },
    description: {
      type: String,
      required: true
    },
    about: {
      type: String
    },
    eligibility: {
      type: String,
      default: "12th standard passed with Mathematics or Computer Science."
    },
    admissionProcess: {
      type: String,
      default:
        "Admission based on qualifying examination marks and university counseling."
    },
    averageSalary: {
      type: mongoose.Schema.Types.Mixed,
      default: "₹3 - ₹8 LPA" // Supports string or { min, max }
    },
    subjects: {
      type: [String],
      default: []
    },
    skills: {
      type: [String],
      default: []
    },
    jobRoles: {
      type: [String],
      default: []
    },
    higherStudies: {
      type: [String], // e.g. ["M.Sc Computer Science", "MCA", "MBA"]
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DegreeCourse", degreeCourseSchema);
