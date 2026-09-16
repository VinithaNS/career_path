const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    qualification: {
      type: String,
      required: true,
      trim: true
    },

    specialization: {
      type: String,
      trim: true,
      default: ""
    },

    experience: {
      type: Number,
      default: 0,
      min: 0
    },

    schoolName: {
      type: String,
      trim: true,
      default: ""
    },

    subjects: [
      {
        type: String,
        trim: true
      }
    ],

    designation: {
      type: String,
      trim: true,
      default: "Teacher"
    },

    joiningDate: {
      type: Date,
      default: null
    },

    address: {
      type: String,
      trim: true,
      default: ""
    },

    city: {
      type: String,
      trim: true,
      default: ""
    },

    state: {
      type: String,
      trim: true,
      default: ""
    },

    country: {
      type: String,
      default: "India"
    },

    profileCompleted: {
      type: Boolean,
      default: false
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

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
