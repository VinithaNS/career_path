const assessmentCategoryService = require("../services/assessmentCategoryService");

// =====================================================
// CREATE
// =====================================================

const createAssessmentCategory = async (req, res) => {
  try {
    const category = await assessmentCategoryService.createAssessmentCategory(
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Assessment category created successfully",
      data: category
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

const getAllAssessmentCategories = async (req, res) => {
  try {
    const categories =
      await assessmentCategoryService.getAllAssessmentCategories();

    return res.status(200).json({
      success: true,
      message: "Assessment categories fetched successfully",
      data: categories
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

const getActiveAssessmentCategories = async (req, res) => {
  try {
    const categories =
      await assessmentCategoryService.getActiveAssessmentCategories();

    return res.status(200).json({
      success: true,
      message: "Active assessment categories fetched successfully",
      data: categories
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

const getAssessmentCategoryById = async (req, res) => {
  try {
    const category = await assessmentCategoryService.getAssessmentCategoryById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Assessment category fetched successfully",
      data: category
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

const updateAssessmentCategory = async (req, res) => {
  try {
    const category = await assessmentCategoryService.updateAssessmentCategory(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Assessment category updated successfully",
      data: category
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

const deleteAssessmentCategory = async (req, res) => {
  try {
    const result = await assessmentCategoryService.deleteAssessmentCategory(
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
  createAssessmentCategory,
  getAllAssessmentCategories,
  getActiveAssessmentCategories,
  getAssessmentCategoryById,
  updateAssessmentCategory,
  deleteAssessmentCategory
};
