const Counselor = require("../model/counselorModel");
const User = require("../model/userModel");

// CREATE COUNSELOR PROFILE
const createCounselorProfile = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "counselor") {
    throw new Error("User is not a counselor");
  }

  const existingCounselor = await Counselor.findOne({
    userId
  });

  if (existingCounselor) {
    throw new Error("Counselor profile already exists");
  }

  const counselor = await Counselor.create({
    userId,
    ...data
  });

  return counselor;
};

// GET COUNSELOR PROFILE
const getCounselorProfile = async (userId) => {
  const counselor = await Counselor.findOne({
    userId
  }).populate("userId", "-password");

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  return counselor;
};

// UPDATE COUNSELOR PROFILE
const updateCounselorProfile = async (userId, data) => {
  const counselor = await Counselor.findOneAndUpdate(
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

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  return counselor;
};

// DELETE COUNSELOR PROFILE
const deleteCounselorProfile = async (userId) => {
  const counselor = await Counselor.findOneAndDelete({
    userId
  });

  if (!counselor) {
    throw new Error("Counselor profile not found");
  }

  return counselor;
};

module.exports = {
  createCounselorProfile,
  getCounselorProfile,
  updateCounselorProfile,
  deleteCounselorProfile
};
