const teacherService = require("../services/teacherService");

// CREATE
const createTeacher = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacher = await teacherService.createTeacherProfile(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Teacher profile created successfully",
      data: teacher
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET
const getTeacher = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacher = await teacherService.getTeacherProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Teacher profile fetched successfully",
      data: teacher
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateTeacher = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacher = await teacherService.updateTeacherProfile(userId, req.body);

    return res.status(200).json({
      success: true,
      message: "Teacher profile updated successfully",
      data: teacher
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteTeacher = async (req, res) => {
  try {
    const userId = req.user.id;

    await teacherService.deleteTeacherProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Teacher profile deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher
};
