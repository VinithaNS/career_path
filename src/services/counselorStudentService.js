const Counselor = require("../model/counselorModel");
const Student = require("../model/studentModel");
const CounselorStudent = require("../model/counselorStudentModel");

// ASSIGN STUDENT
const assignStudent = async (userId, data) => {
  const { studentId, counselingType, notes } = data;

  const counselor = await Counselor.findOne({
    userId
  });

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  const existing = await CounselorStudent.findOne({
    counselorId: counselor._id,
    studentId
  });

  if (existing) {
    throw new Error("Student already assigned to this counselor");
  }

  const counselorStudent = await CounselorStudent.create({
    counselorId: counselor._id,
    studentId,
    counselingType,
    notes
  });

  return counselorStudent;
};

// GET ALL STUDENTS
const getMyStudents = async (userId) => {
  const counselor = await Counselor.findOne({
    userId
  });

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  const students = await CounselorStudent.find({
    counselorId: counselor._id,
    isActive: true
  })
    .populate("studentId")
    .populate("counselorId");

  return students;
};

// GET ONE STUDENT
const getMyStudent = async (userId, studentId) => {
  const counselor = await Counselor.findOne({
    userId
  });

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  const relationship = await CounselorStudent.findOne({
    counselorId: counselor._id,
    studentId,
    isActive: true
  })
    .populate("studentId")
    .populate("counselorId");

  if (!relationship) {
    throw new Error("Student is not assigned to this counselor");
  }

  return relationship;
};

// UPDATE
const updateAssignment = async (userId, studentId, data) => {
  const counselor = await Counselor.findOne({
    userId
  });

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  const relationship = await CounselorStudent.findOneAndUpdate(
    {
      counselorId: counselor._id,
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
  const counselor = await Counselor.findOne({
    userId
  });

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  const relationship = await CounselorStudent.findOneAndUpdate(
    {
      counselorId: counselor._id,
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
