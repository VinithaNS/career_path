const mongoose = require("mongoose");

const teacherStudentSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    subject: {
      type: String,
      trim: true,
      default: ""
    },

    academicYear: {
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

teacherStudentSchema.index(
  {
    teacherId: 1,
    studentId: 1
  },
  {
    unique: true
  }
);

const TeacherStudent = mongoose.model("TeacherStudent", teacherStudentSchema);

module.exports = TeacherStudent;
