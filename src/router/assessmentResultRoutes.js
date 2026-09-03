const express = require("express");

const router = express.Router();

const {
  createAssessmentResult,
  getAssessmentResultById,
  getStudentResults,
  getAssessmentResults,
  getLatestStudentResult
} = require("../controller/assessmentResultController");

// =====================================================
// CREATE RESULT
// =====================================================

router.post("/create", createAssessmentResult);

// =====================================================
// GET STUDENT RESULTS
// =====================================================

router.get("/student/:studentId", getStudentResults);

// =====================================================
// GET LATEST STUDENT RESULT
// =====================================================

router.get("/student/:studentId/latest", getLatestStudentResult);

// =====================================================
// GET ASSESSMENT RESULTS
// =====================================================

router.get("/assessment/:assessmentId", getAssessmentResults);

// =====================================================
// GET RESULT BY ID
// =====================================================

router.get("/:id", getAssessmentResultById);

module.exports = router;
