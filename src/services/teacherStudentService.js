const Teacher = require("../model/teacherModel");
const Student = require("../model/studentModel");
const TeacherStudent = require("../model/teacherStudentModel");

// ASSIGN STUDENT
const assignStudent = async (userId, data) => {
  const { studentId, subject, academicYear } = data;

  // Find teacher profile
  const teacher = await Teacher.findOne({
    userId
  });

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  // Check student
  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  // Check existing relationship
  const existing = await TeacherStudent.findOne({
    teacherId: teacher._id,
    studentId
  });

  if (existing) {
    throw new Error("Student already assigned to this teacher");
  }

  const teacherStudent = await TeacherStudent.create({
    teacherId: teacher._id,
    studentId,
    subject,
    academicYear
  });

  return teacherStudent;
};

// GET ALL STUDENTS
const getMyStudents = async (userId) => {
  const teacher = await Teacher.findOne({
    userId
  });

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  const students = await TeacherStudent.find({
    teacherId: teacher._id,
    isActive: true
  })
    .populate("studentId")
    .populate("teacherId");

  return students;
};

// GET ONE STUDENT
const getMyStudent = async (userId, studentId) => {
  const teacher = await Teacher.findOne({
    userId
  });

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  const relationship = await TeacherStudent.findOne({
    teacherId: teacher._id,
    studentId,
    isActive: true
  })
    .populate("studentId")
    .populate("teacherId");

  if (!relationship) {
    throw new Error("Student is not assigned to this teacher");
  }

  return relationship;
};

// UPDATE ASSIGNMENT
const updateAssignment = async (userId, studentId, data) => {
  const teacher = await Teacher.findOne({
    userId
  });

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  const relationship = await TeacherStudent.findOneAndUpdate(
    {
      teacherId: teacher._id,
      studentId,
      isActive: true
    },
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!relationship) {
    throw new Error("Student assignment not found");
  }

  return relationship;
};

// REMOVE STUDENT
const removeStudent = async (userId, studentId) => {
  const teacher = await Teacher.findOne({
    userId
  });

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }
  const relationship = await TeacherStudent.findOneAndUpdate(
    {
      teacherId: teacher._id,
      studentId
    },
    {
      $set: {
        isActive: false
      }
    },
    {
      new: true
    }
  );
  if (!relationship) {
    throw new Error("Student assignment not found");
  }
  return relationship;
};

module.exports = {
  assignStudent,
  getMyStudents,
  getMyStudent,
  updateAssignment,
  removeStudent
};
