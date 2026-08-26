const mongoose = require("mongoose");

const parentStudentSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    relationship: {
      type: String,
      enum: ["father", "mother", "guardian"],
      required: true
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

parentStudentSchema.index(
  {
    parentId: 1,
    studentId: 1
  },
  {
    unique: true
  }
);

const ParentStudent = mongoose.model("ParentStudent", parentStudentSchema);

module.exports = ParentStudent;
