const Teacher = require("../model/teacherModel");
const User = require("../model/userModel");

const createTeacherProfile = async (userId, data) => {
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (existingUser.role !== "teacher") {
    throw new Error("User is not a teacher");
  }

  const existingTeacher = await Teacher.findOne({
    userId
  });

  if (existingTeacher) {
    throw new Error("Teacher profile already exists");
  }

  const teacher = await Teacher.create({
    userId,
    ...data
  });

  return teacher;
};

const getTeacherProfile = async (userId) => {
  const teacher = await Teacher.findOne({
    userId
  }).populate("userId", "-password");

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  return teacher;
};

const updateTeacherProfile = async (userId, data) => {
  const teacher = await Teacher.findOneAndUpdate(
    { userId },
    {
      $set: {
        ...data,
        profileCompleted: true
      }
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  return teacher;
};

const deleteTeacherProfile = async (userId) => {
  const teacher = await Teacher.findOneAndDelete({
    userId
  });

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  return teacher;
};

module.exports = {
  createTeacherProfile,
  getTeacherProfile,
  updateTeacherProfile,
  deleteTeacherProfile
};
