const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    schoolName: {
      type: String,
      trim: true,
      default: ""
    },

    currentClass: {
      type: String,
      trim: true,
      default: ""
    },

    stream: {
      type: String,
      trim: true,
      default: ""
    },

    dateOfBirth: {
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

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
