const Student = require("../model/studentModel");

const User = require("../model/userModel");

// ----------------------------------
// CREATE STUDENT PROFILE
// ----------------------------------

const createStudent = async (userId, data) => {
  // Check user
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check role
  if (user.role !== "student") {
    throw new Error("User is not a student");
  }

  // Check existing profile
  const existingStudent = await Student.findOne({
    userId
  });

  if (existingStudent) {
    throw new Error("Student profile already exists");
  }

  const student = await Student.create({
    userId,
    ...data
  });

  return student;
};

// ----------------------------------
// GET MY PROFILE
// ----------------------------------

const getMyStudentProfile = async (userId) => {
  const student = await Student.findOne({
    userId
  }).populate("userId", "firstName lastName email mobile role");

  if (!student) {
    throw new Error("Student profile not found");
  }

  return student;
};

// ----------------------------------
// GET STUDENT BY ID
// ----------------------------------

const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId).populate(
    "userId",
    "firstName lastName email mobile role"
  );

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

// ----------------------------------
// UPDATE STUDENT
// ----------------------------------

const updateStudent = async (userId, data) => {
  const student = await Student.findOne({
    userId
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  Object.assign(student, data);

  student.profileCompleted = true;

  await student.save();

  return student;
};

// ----------------------------------
// DELETE STUDENT
// ----------------------------------

const deleteStudent = async (userId) => {
  const student = await Student.findOne({
    userId
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  await Student.findByIdAndDelete(student._id);

  return true;
};

module.exports = {
  createStudent,
  getMyStudentProfile,
  getStudentById,
  updateStudent,
  deleteStudent
};
