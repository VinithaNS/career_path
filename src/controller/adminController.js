const adminService = require("../services/adminService");

// ==========================================
// CREATE ADMIN
// ==========================================

const createAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    const admin = await adminService.createAdminProfile(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Admin profile created successfully",
      data: admin
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// GET ADMIN PROFILE
// ==========================================

const getAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    const admin = await adminService.getAdminProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Admin profile fetched successfully",
      data: admin
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// UPDATE ADMIN
// ==========================================

const updateAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    const admin = await adminService.updateAdminProfile(userId, req.body);

    return res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      data: admin
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// GET ALL USERS
// ==========================================

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// GET USERS BY ROLE
// ==========================================

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const users = await adminService.getUsersByRole(role);

    return res.status(200).json({
      success: true,
      message: `${role} users fetched successfully`,
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// UPDATE USER STATUS
// ==========================================

const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false"
      });
    }

    const user = await adminService.updateUserStatus(userId, isActive);

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// DELETE USER
// ==========================================

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await adminService.deleteUser(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAdmin,
  getAdmin,
  updateAdmin,
  getAllUsers,
  getUsersByRole,
  updateUserStatus,
  deleteUser
};
