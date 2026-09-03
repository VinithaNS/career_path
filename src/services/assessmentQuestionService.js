const AssessmentQuestion = require(
  "../model/assessmentQuestionModel"
);

const Assessment = require(
  "../model/assessmentModel"
);

const AssessmentCategory = require(
  "../model/assessmentCategoryModel"
);


// =====================================================
// CREATE QUESTION
// =====================================================

const createAssessmentQuestion = async (data) => {
  try {

    // Check assessment
    const assessment =
      await Assessment.findById(
        data.assessment
      );

    if (!assessment) {
      throw new Error(
        "Assessment not found"
      );
    }


    // Check category
    const category =
      await AssessmentCategory.findById(
        data.category
      );

    if (!category) {
      throw new Error(
        "Assessment category not found"
      );
    }


    // Create question
    const question =
      await AssessmentQuestion.create(data);


    // Update total questions
    await Assessment.findByIdAndUpdate(
      data.assessment,
      {
        $inc: {
          totalQuestions: 1
        }
      }
    );


    return await AssessmentQuestion
      .findById(question._id)
      .populate("assessment")
      .populate("category");

  } catch (error) {
    throw new Error(error.message);
  }
};


// =====================================================
// GET ALL QUESTIONS
// =====================================================

const getAllAssessmentQuestions = async () => {
  try {

    const questions =
      await AssessmentQuestion.find()
        .populate("assessment")
        .populate("category")
        .sort({
          displayOrder: 1,
          createdAt: -1
        });

    return questions;

  } catch (error) {
    throw new Error(error.message);
  }
};


// =====================================================
// GET QUESTIONS BY ASSESSMENT
// =====================================================

const getQuestionsByAssessment = async (
  assessmentId
) => {
  try {

    const assessment =
      await Assessment.findById(
        assessmentId
      );

    if (!assessment) {
      throw new Error(
        "Assessment not found"
      );
    }


    const questions =
      await AssessmentQuestion.find({
        assessment: assessmentId,
        isActive: true
      })
        .populate("assessment")
        .populate("category")
        .sort({
          displayOrder: 1
        });

    return questions;

  } catch (error) {
    throw new Error(error.message);
  }
};


// =====================================================
// GET QUESTION BY ID
// =====================================================

const getAssessmentQuestionById = async (
  id
) => {
  try {

    const question =
      await AssessmentQuestion.findById(id)
        .populate("assessment")
        .populate("category");

    if (!question) {
      throw new Error(
        "Assessment question not found"
      );
    }

    return question;

  } catch (error) {
    throw new Error(error.message);
  }
};


// =====================================================
// UPDATE QUESTION
// =====================================================

const updateAssessmentQuestion = async (
  id,
  data
) => {
  try {

    const question =
      await AssessmentQuestion.findById(id);

    if (!question) {
      throw new Error(
        "Assessment question not found"
      );
    }


    // Check assessment if changed
    if (data.assessment) {

      const assessment =
        await Assessment.findById(
          data.assessment
        );

      if (!assessment) {
        throw new Error(
          "Assessment not found"
        );
      }
    }


    // Check category if changed
    if (data.category) {

      const category =
        await AssessmentCategory.findById(
          data.category
        );

      if (!category) {
        throw new Error(
          "Assessment category not found"
        );
      }
    }


    const updatedQuestion =
      await AssessmentQuestion
        .findByIdAndUpdate(
          id,
          data,
          {
            new: true,
            runValidators: true
          }
        )
        .populate("assessment")
        .populate("category");

    return updatedQuestion;

  } catch (error) {
    throw new Error(error.message);
  }
};


// =====================================================
// DELETE QUESTION
// =====================================================

const deleteAssessmentQuestion = async (
  id
) => {
  try {

    const question =
      await AssessmentQuestion.findById(id);

    if (!question) {
      throw new Error(
        "Assessment question not found"
      );
    }


    const assessmentId =
      question.assessment;


    await AssessmentQuestion
      .findByIdAndDelete(id);


    // Decrease question count
    await Assessment.findByIdAndUpdate(
      assessmentId,
      {
        $inc: {
          totalQuestions: -1
        }
      }
    );


    return {
      message:
        "Assessment question deleted successfully"
    };

  } catch (error) {
    throw new Error(error.message);
  }
};


// =====================================================
// ACTIVATE / DEACTIVATE QUESTION
// =====================================================

const toggleQuestionStatus = async (
  id
) => {
  try {

    const question =
      await AssessmentQuestion.findById(id);

    if (!question) {
      throw new Error(
        "Assessment question not found"
      );
    }


    question.isActive =
      !question.isActive;

    await question.save();

    return question;

  } catch (error) {
    throw new Error(error.message);
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