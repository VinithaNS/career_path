const governmentExamService = require("../services/governmentExamService");

// =====================================================
// CREATE GOVERNMENT EXAM
// =====================================================

const createGovernmentExam = async (req, res) => {
  try {
    const exam = await governmentExamService.createGovernmentExam(req.body);

    return res.status(201).json({
      success: true,
      message: "Government exam created successfully",
      data: exam
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL GOVERNMENT EXAMS
// =====================================================

const getAllGovernmentExams = async (req, res) => {
  try {
    const exams = await governmentExamService.getAllGovernmentExams();

    return res.status(200).json({
      success: true,
      message: "Government exams fetched successfully",
      data: exams
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE GOVERNMENT EXAMS
// =====================================================

const getActiveGovernmentExams = async (req, res) => {
  try {
    const exams = await governmentExamService.getActiveGovernmentExams();

    return res.status(200).json({
      success: true,
      message: "Active government exams fetched successfully",
      data: exams
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET GOVERNMENT EXAM BY ID
// =====================================================

const getGovernmentExamById = async (req, res) => {
  try {
    const exam = await governmentExamService.getGovernmentExamById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Government exam fetched successfully",
      data: exam
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEARCH GOVERNMENT EXAMS
// =====================================================

const searchGovernmentExams = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const exams = await governmentExamService.searchGovernmentExams(search);

    return res.status(200).json({
      success: true,
      message: "Government exam search completed successfully",
      data: exams
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET EXAMS BY CAREER
// =====================================================

const getExamsByCareer = async (req, res) => {
  try {
    const exams = await governmentExamService.getExamsByCareer(
      req.params.careerId
    );

    return res.status(200).json({
      success: true,
      message: "Government exams fetched successfully",
      data: exams
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET EXAMS BY SKILL
// =====================================================

const getExamsBySkill = async (req, res) => {
  try {
    const exams = await governmentExamService.getExamsBySkill(
      req.params.skillId
    );

    return res.status(200).json({
      success: true,
      message: "Government exams fetched successfully",
      data: exams
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE GOVERNMENT EXAM
// =====================================================

const updateGovernmentExam = async (req, res) => {
  try {
    const exam = await governmentExamService.updateGovernmentExam(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Government exam updated successfully",
      data: exam
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE GOVERNMENT EXAM
// =====================================================

const deleteGovernmentExam = async (req, res) => {
  try {
    const result = await governmentExamService.deleteGovernmentExam(
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
  createGovernmentExam,
  getAllGovernmentExams,
  getActiveGovernmentExams,
  getGovernmentExamById,
  searchGovernmentExams,
  getExamsByCareer,
  getExamsBySkill,
  updateGovernmentExam,
  deleteGovernmentExam
};
