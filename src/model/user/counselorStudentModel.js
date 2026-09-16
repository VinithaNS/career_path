const mongoose = require("mongoose");

const counselorStudentSchema = new mongoose.Schema(
  {
    counselorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counselor",
      required: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    counselingType: {
      type: String,
      enum: ["career", "education", "academic", "personal", "general"],
      default: "career"
    },

    notes: {
      type: String,
      trim: true,
      default: ""
    },

    assignedDate: {
      type: Date,
      default: Date.now
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

counselorStudentSchema.index(
  {
    counselorId: 1,
    studentId: 1
  },
  {
    unique: true
  }
);

const CounselorStudent = mongoose.model(
  "CounselorStudent",
  counselorStudentSchema
);

module.exports = CounselorStudent;
