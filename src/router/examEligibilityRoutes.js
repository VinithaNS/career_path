const express = require("express");

const router = express.Router();

const {
  createExamEligibility,
  getAllExamEligibilities,
  getActiveExamEligibilities,
  getExamEligibilityById,
  getEligibilityByExam,
  updateExamEligibility,
  deleteExamEligibility
} = require("../controller/examEligibilityController");

// CREATE
router.post("/create", createExamEligibility);

// GET ALL
router.get("/all", getAllExamEligibilities);

// GET ACTIVE
router.get("/active", getActiveExamEligibilities);

// GET BY GOVERNMENT EXAM
router.get("/exam/:examId", getEligibilityByExam);

// GET BY ID
router.get("/:id", getExamEligibilityById);

// UPDATE
router.put("/update/:id", updateExamEligibility);

// DELETE
router.delete("/delete/:id", deleteExamEligibility);

module.exports = router;
