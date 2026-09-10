const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await authService.updateUserProfile(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await authService.updateAvatar(req.user.id, avatarUrl);

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  uploadAvatar
};
