const Admin = require("../model/adminModel");
const User = require("../model/userModel");

// ==========================================
// CREATE ADMIN PROFILE
// ==========================================

const createAdminProfile = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "admin") {
    throw new Error("User is not an admin");
  }

  const existingAdmin = await Admin.findOne({
    userId
  });

  if (existingAdmin) {
    throw new Error("Admin profile already exists");
  }

  const admin = await Admin.create({
    userId,
    ...data
  });

  return admin;
};

// ==========================================
// GET ADMIN PROFILE
// ==========================================

const getAdminProfile = async (userId) => {
  const admin = await Admin.findOne({
    userId
  }).populate("userId", "-password");

  if (!admin) {
    throw new Error("Admin profile not found");
  }

  return admin;
};

// ==========================================
// UPDATE ADMIN PROFILE
// ==========================================

const updateAdminProfile = async (userId, data) => {
  const admin = await Admin.findOneAndUpdate(
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

  if (!admin) {
    throw new Error("Admin profile not found");
  }

  return admin;
};

// ==========================================
// GET ALL USERS
// ==========================================

const getAllUsers = async () => {
  const users = await User.find().select("-password").sort({
    createdAt: -1
  });

  return users;
};

// ==========================================
// GET USERS BY ROLE
// ==========================================

const getUsersByRole = async (role) => {
  const allowedRoles = ["admin", "parent", "student", "teacher", "counselor"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const users = await User.find({
    role
  })
    .select("-password")
    .sort({
      createdAt: -1
    });

  return users;
};

// ==========================================
// ACTIVATE / DEACTIVATE USER
// ==========================================

const updateUserStatus = async (userId, isActive) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        isActive
      }
    },
    {
      new: true
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// ==========================================
// DELETE USER
// ==========================================

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  createAdminProfile,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  getUsersByRole,
  updateUserStatus,
  deleteUser
};
