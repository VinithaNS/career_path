const mongoose = require("mongoose");

const careerEligibilitySchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true
    },

    educationType: {
      type: String,
      enum: ["11th Group", "Diploma", "Degree", "Post Graduation", "Any"],
      required: true
    },

    eleventhGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EleventhGroup",
      default: null
    },

    diplomaCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiplomaCourse",
      default: null
    },

    degreeCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DegreeCourse",
      default: null
    },

    minimumQualification: {
      type: String,
      trim: true
    },

    requiredSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],

    minimumPercentage: {
      type: Number,
      default: 0
    },

    entranceExamRequired: {
      type: Boolean,
      default: false
    },

    entranceExams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GovernmentExam"
      }
    ],

    description: {
      type: String,
      trim: true
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

careerEligibilitySchema.index({
  career: 1,
  educationType: 1
});

module.exports = mongoose.model("CareerEligibility", careerEligibilitySchema);
