const collegeService = require("../services/collegeService");

// =====================================================
// CREATE COLLEGE
// =====================================================

const createCollege = async (req, res) => {
  try {
    const college = await collegeService.createCollege(req.body);

    return res.status(201).json({
      success: true,
      message: "College created successfully",
      data: college
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL COLLEGES
// =====================================================

const getAllColleges = async (req, res) => {
  try {
    const colleges = await collegeService.getAllColleges();

    return res.status(200).json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE COLLEGES
// =====================================================

const getActiveColleges = async (req, res) => {
  try {
    const colleges = await collegeService.getActiveColleges();

    return res.status(200).json({
      success: true,
      message: "Active colleges fetched successfully",
      data: colleges
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET COLLEGE BY ID
// =====================================================

const getCollegeById = async (req, res) => {
  try {
    const college = await collegeService.getCollegeById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "College fetched successfully",
      data: college
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEARCH COLLEGES
// =====================================================

const searchColleges = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const colleges = await collegeService.searchColleges(search);

    return res.status(200).json({
      success: true,
      message: "College search completed successfully",
      data: colleges
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET COLLEGES BY STATE
// =====================================================

const getCollegesByState = async (req, res) => {
  try {
    const colleges = await collegeService.getCollegesByState(req.params.state);

    return res.status(200).json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET COLLEGES BY CITY
// =====================================================

const getCollegesByCity = async (req, res) => {
  try {
    const colleges = await collegeService.getCollegesByCity(req.params.city);

    return res.status(200).json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE COLLEGE
// =====================================================

const updateCollege = async (req, res) => {
  try {
    const college = await collegeService.updateCollege(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "College updated successfully",
      data: college
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE COLLEGE
// =====================================================

const deleteCollege = async (req, res) => {
  try {
    const result = await collegeService.deleteCollege(req.params.id);

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
  createCollege,
  getAllColleges,
  getActiveColleges,
  getCollegeById,
  searchColleges,
  getCollegesByState,
  getCollegesByCity,
  updateCollege,
  deleteCollege
};
