const mongoose = require("mongoose");

const diplomaCourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
      trim: true // e.g. "Diploma in Mechanical Engineering"
    },
    courseCode: {
      type: String,
      required: true,
      uppercase: true // e.g. "DME"
    },
    stream: {
      type: String,
      default: "Engineering & Technology"
    },
    duration: {
      type: String,
      default: "3 Years (6 Semesters)"
    },
    description: {
      type: String,
      required: true
    },
    eligibility: {
      type: String,
      default: "Pass in 10th Standard (SSLC) with Mathematics and Science."
    },
    averageSalary: {
      type: String,
      default: "₹2.5 - 4.5 LPA"
    },
    skills: {
      type: [String], // e.g. ["AutoCAD", "CNC Programming", "Hydraulics", "Quality Control"]
      default: []
    },
    directJobRoles: {
      type: [String], // e.g. ["Junior Mechanical Engineer", "CAD Drafter", "CNC Operator", "Maintenance Technician"]
      default: []
    },
    lateralEntryScope: {
      isEligibleForEngineering: {
        type: Boolean,
        default: true
      },
      targetSemester: {
        type: String,
        default: "Direct Entry to 3rd Semester (2nd Year B.E/B.Tech)"
      },
      degreeBranches: {
        type: [String], // e.g. ["B.E Mechanical Engineering", "B.Tech Mechatronics", "B.E Automobile Engineering"]
        default: []
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiplomaCourse", diplomaCourseSchema);
