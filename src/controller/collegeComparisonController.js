const collegeComparisonService = require("../services/collegeComparisonService");

// =====================================================
// CREATE COMPARISON
// =====================================================

const createCollegeComparison = async (req, res) => {
  try {
    const comparison = await collegeComparisonService.createCollegeComparison(
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "College comparison created successfully",
      data: comparison
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

const getAllCollegeComparisons = async (req, res) => {
  try {
    const comparisons =
      await collegeComparisonService.getAllCollegeComparisons();

    return res.status(200).json({
      success: true,
      message: "College comparisons fetched successfully",
      data: comparisons
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

const getActiveCollegeComparisons = async (req, res) => {
  try {
    const comparisons =
      await collegeComparisonService.getActiveCollegeComparisons();

    return res.status(200).json({
      success: true,
      message: "Active college comparisons fetched successfully",
      data: comparisons
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

const getCollegeComparisonById = async (req, res) => {
  try {
    const comparison = await collegeComparisonService.getCollegeComparisonById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "College comparison fetched successfully",
      data: comparison
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

const updateCollegeComparison = async (req, res) => {
  try {
    const comparison = await collegeComparisonService.updateCollegeComparison(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "College comparison updated successfully",
      data: comparison
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

const deleteCollegeComparison = async (req, res) => {
  try {
    const result = await collegeComparisonService.deleteCollegeComparison(
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
  createCollegeComparison,
  getAllCollegeComparisons,
  getActiveCollegeComparisons,
  getCollegeComparisonById,
  updateCollegeComparison,
  deleteCollegeComparison
};
