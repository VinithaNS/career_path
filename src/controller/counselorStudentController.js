const counselorStudentService = require("../services/counselorStudentService");

// ASSIGN STUDENT
const assignStudent = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await counselorStudentService.assignStudent(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Student assigned to counselor successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET MY STUDENTS
const getMyStudents = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await counselorStudentService.getMyStudents(userId);

    return res.status(200).json({
      success: true,
      message: "Counselor students fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET ONE STUDENT
const getMyStudent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { studentId } = req.params;

    const result = await counselorStudentService.getMyStudent(
      userId,
      studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateAssignment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { studentId } = req.params;

    const result = await counselorStudentService.updateAssignment(
      userId,
      studentId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Counselor student assignment updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// REMOVE
const removeStudent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { studentId } = req.params;

    await counselorStudentService.removeStudent(userId, studentId);

    return res.status(200).json({
      success: true,
      message: "Student removed from counselor successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  assignStudent,
  getMyStudents,
  getMyStudent,
  updateAssignment,
  removeStudent
};
