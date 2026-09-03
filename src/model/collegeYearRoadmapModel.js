const mongoose = require("mongoose");

const collegeYearRoadmapSchema = new mongoose.Schema(
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

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    goals: [
      {
        type: String,
        trim: true
      }
    ],

    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ],

    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification"
      }
    ],

    internships: [
      {
        title: String,
        description: String,
        recommendedDuration: String
      }
    ],

    activities: [
      {
        title: String,
        description: String,
        category: String
      }
    ],

    placementPreparation: [
      {
        title: String,
        description: String
      }
    ],

    recommendedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CareerRecommendation"
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

collegeYearRoadmapSchema.index({
  college: 1,
  course: 1,
  year: 1
});

module.exports = mongoose.model("CollegeYearRoadmap", collegeYearRoadmapSchema);
