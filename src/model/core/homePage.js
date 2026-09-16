const mongoose = require("mongoose");

const homePageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    subtitle: {
      type: String,
      default: "",
      trim: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    bannerImage: {
      type: String,
      default: ""
    },

    bannerTitle: {
      type: String,
      default: "",
      trim: true
    },

    bannerDescription: {
      type: String,
      default: "",
      trim: true
    },

    bannerButtonText: {
      type: String,
      default: "",
      trim: true
    },

    bannerButtonLink: {
      type: String,
      default: "",
      trim: true
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],

    featuredCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ],

    featuredCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DegreeCourse"
      }
    ],

    featuredColleges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College"
      }
    ],

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

const HomePage = mongoose.model("HomePage", homePageSchema);

module.exports = HomePage;
