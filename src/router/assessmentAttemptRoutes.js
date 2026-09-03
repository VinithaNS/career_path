const express = require("express");

const router = express.Router();

const {
  startAssessment,
  getAttemptById,
  getStudentAttempts,
  getAssessmentAttempts,
  submitAnswer,
  completeAttempt,
  abandonAttempt
} = require("../controller/assessmentAttemptController");

// =====================================================
// START ASSESSMENT
// =====================================================

router.post("/start", startAssessment);

// =====================================================
// GET STUDENT ATTEMPTS
// =====================================================

router.get("/student/:studentId", getStudentAttempts);

// =====================================================
// GET ASSESSMENT ATTEMPTS
// =====================================================

router.get("/assessment/:assessmentId", getAssessmentAttempts);

// =====================================================
// SUBMIT ANSWER
// =====================================================

router.post("/answer/:id", submitAnswer);

// =====================================================
// COMPLETE
// =====================================================

router.post("/complete/:id", completeAttempt);

// =====================================================
// ABANDON
// =====================================================

router.post("/abandon/:id", abandonAttempt);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getAttemptById);

module.exports = router;
