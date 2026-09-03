const savedCareerService = require("../services/savedCareerService");

// =====================================================
// SAVE CAREER
// =====================================================

const saveCareer = async (req, res) => {
  try {
    const result = await savedCareerService.saveCareer(req.body);

    return res.status(201).json({
      success: true,
      message: "Career saved successfully",
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
// GET ALL SAVED CAREERS
// =====================================================

const getAllSavedCareers = async (req, res) => {
  try {
    const result = await savedCareerService.getAllSavedCareers();

    return res.status(200).json({
      success: true,
      message: "Saved careers fetched successfully",
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
// GET SAVED CAREER BY ID
// =====================================================

const getSavedCareerById = async (req, res) => {
  try {
    const result = await savedCareerService.getSavedCareerById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Saved career fetched successfully",
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

const getSavedCareersByStudent = async (req, res) => {
  try {
    const result = await savedCareerService.getSavedCareersByStudent(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student saved careers fetched successfully",
      count: result.length,
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
// CHECK SAVED CAREER
// =====================================================

const checkSavedCareer = async (req, res) => {
  try {
    const result = await savedCareerService.checkSavedCareer(
      req.params.studentId,
      req.params.careerId
    );

    return res.status(200).json({
      success: true,
      message: "Saved career status fetched successfully",
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
// UPDATE
// =====================================================

const updateSavedCareer = async (req, res) => {
  try {
    const result = await savedCareerService.updateSavedCareer(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Saved career updated successfully",
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
// REMOVE BY ID
// =====================================================

const removeSavedCareer = async (req, res) => {
  try {
    const result = await savedCareerService.removeSavedCareer(req.params.id);

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
// REMOVE BY STUDENT + CAREER
// =====================================================

const removeCareerForStudent = async (req, res) => {
  try {
    const result = await savedCareerService.removeCareerForStudent(
      req.params.studentId,
      req.params.careerId
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
  saveCareer,
  getAllSavedCareers,
  getSavedCareerById,
  getSavedCareersByStudent,
  checkSavedCareer,
  updateSavedCareer,
  removeSavedCareer,
  removeCareerForStudent
};
