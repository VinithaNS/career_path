const mongoose = require("mongoose");

const eleventhGroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
      trim: true // e.g. "Bio-Maths", "Computer Science", "Pure Science", "Commerce"
    },
    groupCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true // e.g. "BIO-MATHS", "CS", "COMM"
    },
    streamCategory: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "Vocational"],
      default: "Science"
    },
    description: {
      type: String,
      required: true
    },
    coreSubjects: {
      type: [String],
      required: true // e.g. ["Physics", "Chemistry", "Mathematics", "Biology", "English"]
    },
    eligibility: {
      type: String,
      default:
        "Students who have completed 10th standard with the required marks as per school or board admission criteria."
    },
    careerOptions: {
      type: [String], // e.g. ["Doctor", "Software Developer", "Data Scientist", "Research Scientist"]
      default: []
    },
    courseOptions: {
      type: [String], // e.g. ["MBBS", "B.E Computer Science", "B.Tech", "B.Sc", "BCA", "B.Pharm"]
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EleventhGroup", eleventhGroupSchema);
