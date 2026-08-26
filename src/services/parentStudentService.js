const ParentStudent = require("../model/parentStudentModel");

const Parent = require("../model/parentModel");

const Student = require("../model/studentModel");

// ----------------------------------
// LINK STUDENT
// ----------------------------------

const linkStudent = async (userId, studentId, relationship) => {
  // Find parent profile
  const parent = await Parent.findOne({
    userId
  });

  if (!parent) {
    throw new Error("Parent profile not found");
  }

  // Find student
  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  // Check existing relationship
  const existing = await ParentStudent.findOne({
    parentId: parent._id,
    studentId
  });

  if (existing) {
    throw new Error("Student already linked");
  }

  const relation = await ParentStudent.create({
    parentId: parent._id,
    studentId,
    relationship
  });

  return relation;
};

// ----------------------------------
// GET MY CHILDREN
// ----------------------------------

const getMyChildren = async (userId) => {
  const parent = await Parent.findOne({
    userId
  });

  if (!parent) {
    throw new Error("Parent profile not found");
  }

  const children = await ParentStudent.find({
    parentId: parent._id,
    isActive: true
  }).populate({
    path: "studentId",
    populate: {
      path: "userId",
      select: "firstName lastName email mobile"
    }
  });

  return children;
};

// ----------------------------------
// GET ONE CHILD
// ----------------------------------

const getChildById = async (userId, studentId) => {
  const parent = await Parent.findOne({
    userId
  });

  if (!parent) {
    throw new Error("Parent profile not found");
  }

  const relation = await ParentStudent.findOne({
    parentId: parent._id,
    studentId,
    isActive: true
  }).populate({
    path: "studentId",
    populate: {
      path: "userId",
      select: "firstName lastName email mobile"
    }
  });

  if (!relation) {
    throw new Error("Student is not linked to this parent");
  }

  return relation;
};

// ----------------------------------
// UNLINK STUDENT
// ----------------------------------

const unlinkStudent = async (userId, studentId) => {
  const parent = await Parent.findOne({
    userId
  });

  if (!parent) {
    throw new Error("Parent profile not found");
  }

  const relation = await ParentStudent.findOne({
    parentId: parent._id,
    studentId
  });

  if (!relation) {
    throw new Error("Student relationship not found");
  }

  await ParentStudent.findByIdAndDelete(relation._id);

  return true;
};

module.exports = {
  linkStudent,
  getMyChildren,
  getChildById,
  unlinkStudent
};
