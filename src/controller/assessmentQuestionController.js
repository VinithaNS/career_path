const assessmentQuestionService =
  require(
    "../services/assessmentQuestionService"
  );


// =====================================================
// CREATE
// =====================================================

const createAssessmentQuestion = async (
  req,
  res
) => {
  try {

    const question =
      await assessmentQuestionService
        .createAssessmentQuestion(
          req.body
        );

    return res.status(201).json({
      success: true,
      message:
        "Assessment question created successfully",
      data: question
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

const getAllAssessmentQuestions = async (
  req,
  res
) => {
  try {

    const questions =
      await assessmentQuestionService
        .getAllAssessmentQuestions();

    return res.status(200).json({
      success: true,
      message:
        "Assessment questions fetched successfully",
      data: questions
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================================
// GET QUESTIONS BY ASSESSMENT
// =====================================================

const getQuestionsByAssessment = async (
  req,
  res
) => {
  try {

    const questions =
      await assessmentQuestionService
        .getQuestionsByAssessment(
          req.params.assessmentId
        );

    return res.status(200).json({
      success: true,
      message:
        "Assessment questions fetched successfully",
      data: questions
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================================
// GET BY ID
// =====================================================

const getAssessmentQuestionById = async (
  req,
  res
) => {
  try {

    const question =
      await assessmentQuestionService
        .getAssessmentQuestionById(
          req.params.id
        );

    return res.status(200).json({
      success: true,
      message:
        "Assessment question fetched successfully",
      data: question
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

const updateAssessmentQuestion = async (
  req,
  res
) => {
  try {

    const question =
      await assessmentQuestionService
        .updateAssessmentQuestion(
          req.params.id,
          req.body
        );

    return res.status(200).json({
      success: true,
      message:
        "Assessment question updated successfully",
      data: question
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

const deleteAssessmentQuestion = async (
  req,
  res
) => {
  try {

    const result =
      await assessmentQuestionService
        .deleteAssessmentQuestion(
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


// =====================================================
// TOGGLE STATUS
// =====================================================

const toggleQuestionStatus = async (
  req,
  res
) => {
  try {

    const question =
      await assessmentQuestionService
        .toggleQuestionStatus(
          req.params.id
        );

    return res.status(200).json({
      success: true,
      message:
        "Question status updated successfully",
      data: question
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


module.exports = {
  createAssessmentQuestion,
  getAllAssessmentQuestions,
  getQuestionsByAssessment,
  getAssessmentQuestionById,
  updateAssessmentQuestion,
  deleteAssessmentQuestion,
  toggleQuestionStatus
};