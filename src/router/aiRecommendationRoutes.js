const express = require("express");

const router = express.Router();

const {
  createRecommendation,
  getRecommendationById,
  getStudentRecommendations,
  getLatestRecommendation,
  deleteRecommendation
} = require("../controller/aiRecommendationController");

// =====================================================
// CREATE AI RECOMMENDATION
// =====================================================

router.post("/create", createRecommendation);

// =====================================================
// GET STUDENT RECOMMENDATIONS
// =====================================================

router.get("/student/:studentId", getStudentRecommendations);

// =====================================================
// GET LATEST STUDENT RECOMMENDATION
// =====================================================

router.get("/student/:studentId/latest", getLatestRecommendation);

// =====================================================
// GET RECOMMENDATION BY ID
// =====================================================

router.get("/:id", getRecommendationById);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteRecommendation);

module.exports = router;
