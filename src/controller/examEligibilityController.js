const examEligibilityService = require("../services/examEligibilityService");

// =====================================================
// CREATE
// =====================================================

const createExamEligibility = async (req, res) => {
  try {
    const eligibility = await examEligibilityService.createExamEligibility(
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Exam eligibility created successfully",
      data: eligibility
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

const getAllExamEligibilities = async (req, res) => {
  try {
    const eligibilities =
      await examEligibilityService.getAllExamEligibilities();

    return res.status(200).json({
      success: true,
      message: "Exam eligibilities fetched successfully",
      data: eligibilities
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE
// =====================================================

const getActiveExamEligibilities = async (req, res) => {
  try {
    const eligibilities =
      await examEligibilityService.getActiveExamEligibilities();

    return res.status(200).json({
      success: true,
      message: "Active exam eligibilities fetched successfully",
      data: eligibilities
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

const getExamEligibilityById = async (req, res) => {
  try {
    const eligibility = await examEligibilityService.getExamEligibilityById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Exam eligibility fetched successfully",
      data: eligibility
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY GOVERNMENT EXAM
// =====================================================

const getEligibilityByExam = async (req, res) => {
  try {
    const eligibilities = await examEligibilityService.getEligibilityByExam(
      req.params.examId
    );

    return res.status(200).json({
      success: true,
      message: "Exam eligibility fetched successfully",
      data: eligibilities
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

const updateExamEligibility = async (req, res) => {
  try {
    const eligibility = await examEligibilityService.updateExamEligibility(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Exam eligibility updated successfully",
      data: eligibility
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

const deleteExamEligibility = async (req, res) => {
  try {
    const result = await examEligibilityService.deleteExamEligibility(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createExamEligibility,
  getAllExamEligibilities,
  getActiveExamEligibilities,
  getExamEligibilityById,
  getEligibilityByExam,
  updateExamEligibility,
  deleteExamEligibility
};
