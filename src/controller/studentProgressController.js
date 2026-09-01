const studentProgressService = require("../services/studentProgressService");

// =====================================================
// CREATE
// =====================================================

const createStudentProgress = async (req, res) => {
  try {
    const result = await studentProgressService.createStudentProgress(req.body);

    return res.status(201).json({
      success: true,
      message: "Student progress created successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL
// =====================================================

const getAllStudentProgress = async (req, res) => {
  try {
    const result = await studentProgressService.getAllStudentProgress();

    return res.status(200).json({
      success: true,
      message: "Student progress fetched successfully",
      count: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY ID
// =====================================================

const getStudentProgressById = async (req, res) => {
  try {
    const result = await studentProgressService.getStudentProgressById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Student progress fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY STUDENT
// =====================================================

const getProgressByStudent = async (req, res) => {
  try {
    const result = await studentProgressService.getProgressByStudent(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student progress fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE
// =====================================================

const updateStudentProgress = async (req, res) => {
  try {
    const result = await studentProgressService.updateStudentProgress(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Student progress updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE OVERALL PROGRESS
// =====================================================

const updateOverallProgress = async (req, res) => {
  try {
    const { overallProgress, lastActivity } = req.body;

    const result = await studentProgressService.updateOverallProgress(
      req.params.id,
      overallProgress,
      lastActivity
    );

    return res.status(200).json({
      success: true,
      message: "Overall progress updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE ROADMAP PROGRESS
// =====================================================

const updateRoadmapProgress = async (req, res) => {
  try {
    const { roadmapProgress } = req.body;

    const result = await studentProgressService.updateRoadmapProgress(
      req.params.id,
      roadmapProgress
    );

    return res.status(200).json({
      success: true,
      message: "Roadmap progress updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE CURRENT STAGE
// =====================================================

const updateCurrentStage = async (req, res) => {
  try {
    const { currentStage } = req.body;

    const result = await studentProgressService.updateCurrentStage(
      req.params.id,
      currentStage
    );

    return res.status(200).json({
      success: true,
      message: "Current stage updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE
// =====================================================

const deleteStudentProgress = async (req, res) => {
  try {
    await studentProgressService.deleteStudentProgress(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Student progress deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createStudentProgress,
  getAllStudentProgress,
  getStudentProgressById,
  getProgressByStudent,
  updateStudentProgress,
  updateOverallProgress,
  updateRoadmapProgress,
  updateCurrentStage,
  deleteStudentProgress
};
