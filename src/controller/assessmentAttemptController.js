const assessmentAttemptService = require("../services/assessmentAttemptService");

// =====================================================
// START ASSESSMENT
// =====================================================

const startAssessment = async (req, res) => {
  try {
    const { studentId, assessmentId } = req.body;

    if (!studentId || !assessmentId) {
      return res.status(400).json({
        success: false,
        message: "studentId and assessmentId are required"
      });
    }

    const attempt = await assessmentAttemptService.startAssessment(
      studentId,
      assessmentId
    );

    return res.status(201).json({
      success: true,
      message: "Assessment started successfully",
      data: attempt
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ATTEMPT BY ID
// =====================================================

const getAttemptById = async (req, res) => {
  try {
    const attempt = await assessmentAttemptService.getAttemptById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Assessment attempt fetched successfully",
      data: attempt
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET STUDENT ATTEMPTS
// =====================================================

const getStudentAttempts = async (req, res) => {
  try {
    const attempts = await assessmentAttemptService.getStudentAttempts(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student assessment attempts fetched successfully",
      data: attempts
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ASSESSMENT ATTEMPTS
// =====================================================

const getAssessmentAttempts = async (req, res) => {
  try {
    const attempts = await assessmentAttemptService.getAssessmentAttempts(
      req.params.assessmentId
    );

    return res.status(200).json({
      success: true,
      message: "Assessment attempts fetched successfully",
      data: attempts
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SUBMIT ANSWER
// =====================================================

const submitAnswer = async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    if (!questionId || selectedAnswer === undefined) {
      return res.status(400).json({
        success: false,
        message: "questionId and selectedAnswer are required"
      });
    }

    const attempt = await assessmentAttemptService.submitAnswer(
      req.params.id,
      questionId,
      selectedAnswer
    );

    return res.status(200).json({
      success: true,
      message: "Answer submitted successfully",
      data: attempt
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// COMPLETE ATTEMPT
// =====================================================

const completeAttempt = async (req, res) => {
  try {
    const attempt = await assessmentAttemptService.completeAttempt(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Assessment completed successfully",
      data: attempt
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// ABANDON ATTEMPT
// =====================================================

const abandonAttempt = async (req, res) => {
  try {
    const attempt = await assessmentAttemptService.abandonAttempt(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Assessment attempt abandoned successfully",
      data: attempt
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  startAssessment,
  getAttemptById,
  getStudentAttempts,
  getAssessmentAttempts,
  submitAnswer,
  completeAttempt,
  abandonAttempt
};
