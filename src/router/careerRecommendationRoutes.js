const express = require("express");

const router = express.Router();

const {
  generateCareerRecommendations,
  getStudentRecommendations,
  getRecommendationById,
  deleteRecommendation
} = require("../controller/careerRecommendationController");

router.post("/generate", generateCareerRecommendations);

router.get("/student/:studentId", getStudentRecommendations);

router.get("/:id", getRecommendationById);

router.delete("/delete/:id", deleteRecommendation);

module.exports = router;
