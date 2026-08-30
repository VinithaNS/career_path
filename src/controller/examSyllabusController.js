const examSyllabusService = require("../services/examSyllabusService");

// =====================================================
// CREATE
// =====================================================

const createExamSyllabus = async (req, res) => {
  try {
    const syllabus = await examSyllabusService.createExamSyllabus(req.body);

    return res.status(201).json({
      success: true,
      message: "Exam syllabus created successfully",
      data: syllabus
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

const getAllExamSyllabus = async (req, res) => {
  try {
    const syllabus = await examSyllabusService.getAllExamSyllabus();

    return res.status(200).json({
      success: true,
      message: "Exam syllabus fetched successfully",
      data: syllabus
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

const getActiveExamSyllabus = async (req, res) => {
  try {
    const syllabus = await examSyllabusService.getActiveExamSyllabus();

    return res.status(200).json({
      success: true,
      message: "Active exam syllabus fetched successfully",
      data: syllabus
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

const getExamSyllabusById = async (req, res) => {
  try {
    const syllabus = await examSyllabusService.getExamSyllabusById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Exam syllabus fetched successfully",
      data: syllabus
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

const getSyllabusByExam = async (req, res) => {
  try {
    const syllabus = await examSyllabusService.getSyllabusByExam(
      req.params.examId
    );

    return res.status(200).json({
      success: true,
      message: "Exam syllabus fetched successfully",
      data: syllabus
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

const updateExamSyllabus = async (req, res) => {
  try {
    const syllabus = await examSyllabusService.updateExamSyllabus(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Exam syllabus updated successfully",
      data: syllabus
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

const deleteExamSyllabus = async (req, res) => {
  try {
    const result = await examSyllabusService.deleteExamSyllabus(req.params.id);

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
  createExamSyllabus,
  getAllExamSyllabus,
  getActiveExamSyllabus,
  getExamSyllabusById,
  getSyllabusByExam,
  updateExamSyllabus,
  deleteExamSyllabus
};
