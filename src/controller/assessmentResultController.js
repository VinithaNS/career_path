const assessmentResultService = require("../services/assessmentResultService");

// =====================================================
// CREATE RESULT
// =====================================================

const createAssessmentResult = async (req, res) => {
  try {
    const { attemptId } = req.body;

    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: "attemptId is required"
      });
    }

    const result =
      await assessmentResultService.createAssessmentResult(attemptId);

    return res.status(201).json({
      success: true,
      message: "Assessment result created successfully",
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
// GET RESULT BY ID
// =====================================================

const getAssessmentResultById = async (req, res) => {
  try {
    const result = await assessmentResultService.getAssessmentResultById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Assessment result fetched successfully",
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
// GET STUDENT RESULTS
// =====================================================

const getStudentResults = async (req, res) => {
  try {
    const results = await assessmentResultService.getStudentResults(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student assessment results fetched successfully",
      data: results
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ASSESSMENT RESULTS
// =====================================================

const getAssessmentResults = async (req, res) => {
  try {
    const results = await assessmentResultService.getAssessmentResults(
      req.params.assessmentId
    );

    return res.status(200).json({
      success: true,
      message: "Assessment results fetched successfully",
      data: results
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET LATEST STUDENT RESULT
// =====================================================

const getLatestStudentResult = async (req, res) => {
  try {
    const result = await assessmentResultService.getLatestStudentResult(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Latest assessment result fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAssessmentResult,
  getAssessmentResultById,
  getStudentResults,
  getAssessmentResults,
  getLatestStudentResult
};
