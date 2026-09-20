import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema(
  {
    heroHeadline: {
      type: String,
      default: "Discover, Learn & Build Your Bright Future"
    },
    heroTagline: {
      type: String,
      default:
        "Explore 500+ career options, find the right courses, top colleges, prepare for exams and build the skills you need to succeed."
    },
    statsOverride: {
      careers: { type: Number, default: 0 },
      colleges: { type: Number, default: 0 },
      exams: { type: Number, default: 0 },
      learningPaths: { type: Number, default: 0 }
    },
    featuredEleventhGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EleventhGroup"
      }
    ],
    featuredDiplomaCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DiplomaCourse"
      }
    ],
    featuredDepartments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Homepage", homepageSchema);
