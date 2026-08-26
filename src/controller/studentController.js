const studentService = require("../services/studentService");

// ----------------------------------
// CREATE PROFILE
// ----------------------------------

const createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      message: "Student profile created successfully",
      data: student
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ----------------------------------
// GET MY PROFILE
// ----------------------------------

const getMyProfile = async (req, res) => {
  try {
    const student = await studentService.getMyStudentProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Student profile fetched successfully",
      data: student
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// ----------------------------------
// GET BY ID
// ----------------------------------

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// ----------------------------------
// UPDATE
// ----------------------------------

const updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      data: student
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ----------------------------------
// DELETE
// ----------------------------------

const deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Student profile deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createStudent,
  getMyProfile,
  getStudentById,
  updateStudent,
  deleteStudent
};
