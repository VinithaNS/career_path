const assessmentService = require("../services/assessmentService");

// =====================================================
// CREATE
// =====================================================

const createAssessment = async (req, res) => {
  try {
    const assessment = await assessmentService.createAssessment(req.body);

    return res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: assessment
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

const getAllAssessments = async (req, res) => {
  try {
    const assessments = await assessmentService.getAllAssessments();

    return res.status(200).json({
      success: true,
      message: "Assessments fetched successfully",
      data: assessments
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

const getActiveAssessments = async (req, res) => {
  try {
    const assessments = await assessmentService.getActiveAssessments();

    return res.status(200).json({
      success: true,
      message: "Active assessments fetched successfully",
      data: assessments
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

const getAssessmentById = async (req, res) => {
  try {
    const assessment = await assessmentService.getAssessmentById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Assessment fetched successfully",
      data: assessment
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

const updateAssessment = async (req, res) => {
  try {
    const assessment = await assessmentService.updateAssessment(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Assessment updated successfully",
      data: assessment
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

const deleteAssessment = async (req, res) => {
  try {
    const result = await assessmentService.deleteAssessment(req.params.id);

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

// =====================================================
// PUBLISH
// =====================================================

const publishAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;

    if (!assessmentId) {
      return res.status(400).json({
        success: false,
        message: "assessmentId is required"
      });
    }

    const assessment = await assessmentService.publishAssessment(assessmentId);

    return res.status(200).json({
      success: true,
      message: "Assessment published successfully",
      data: assessment
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAssessment,
  getAllAssessments,
  getActiveAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  publishAssessment
};
