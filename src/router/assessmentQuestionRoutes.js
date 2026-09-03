const express = require("express");

const router = express.Router();

const {
  createAssessmentQuestion,
  getAllAssessmentQuestions,
  getQuestionsByAssessment,
  getAssessmentQuestionById,
  updateAssessmentQuestion,
  deleteAssessmentQuestion,
  toggleQuestionStatus
} = require(
  "../controller/assessmentQuestionController"
);


// =====================================================
// CREATE QUESTION
// =====================================================

router.post(
  "/create",
  createAssessmentQuestion
);


// =====================================================
// GET ALL QUESTIONS
// =====================================================

router.get(
  "/all",
  getAllAssessmentQuestions
);


// =====================================================
// GET QUESTIONS BY ASSESSMENT
// =====================================================

router.get(
  "/assessment/:assessmentId",
  getQuestionsByAssessment
);


// =====================================================
// GET QUESTION BY ID
// =====================================================

router.get(
  "/:id",
  getAssessmentQuestionById
);


// =====================================================
// UPDATE
// =====================================================

router.put(
  "/update/:id",
  updateAssessmentQuestion
);


// =====================================================
// TOGGLE STATUS
// =====================================================

router.put(
  "/:id/toggle-status",
  toggleQuestionStatus
);


// =====================================================
// DELETE
// =====================================================

router.delete(
  "/delete/:id",
  deleteAssessmentQuestion
);


module.exports = router;