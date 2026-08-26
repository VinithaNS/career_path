const Parent = require("../model/parentModel");

const User = require("../model/userModel");

// ----------------------------------
// CREATE PARENT PROFILE
// ----------------------------------

const createParent = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "parent") {
    throw new Error("User is not a parent");
  }

  const existingParent = await Parent.findOne({
    userId
  });

  if (existingParent) {
    throw new Error("Parent profile already exists");
  }

  const parent = await Parent.create({
    userId,
    ...data
  });

  return parent;
};

// ----------------------------------
// GET MY PROFILE
// ----------------------------------

const getMyParentProfile = async (userId) => {
  const parent = await Parent.findOne({
    userId
  }).populate("userId", "firstName lastName email mobile role");

  if (!parent) {
    throw new Error("Parent profile not found");
  }

  return parent;
};

// ----------------------------------
// UPDATE PROFILE
// ----------------------------------

const updateParent = async (userId, data) => {
  const parent = await Parent.findOne({
    userId
  });

  if (!parent) {
    throw new Error("Parent profile not found");
  }

  Object.assign(parent, data);

  parent.profileCompleted = true;

  await parent.save();

  return parent;
};

// ----------------------------------
// DELETE PROFILE
// ----------------------------------

const deleteParent = async (userId) => {
  const parent = await Parent.findOne({
    userId
  });

  if (!parent) {
    throw new Error("Parent profile not found");
  }

  await Parent.findByIdAndDelete(parent._id);

  return true;
};

module.exports = {
  createParent,
  getMyParentProfile,
  updateParent,
  deleteParent
};
