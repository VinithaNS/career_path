const express = require("express");

const router = express.Router();

const {
  createAssessment,
  getAllAssessments,
  getActiveAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  publishAssessment
} = require("../controller/assessmentController");

// CREATE
router.post("/create", createAssessment);

// GET ALL
router.get("/all", getAllAssessments);

// GET ACTIVE
router.get("/active", getActiveAssessments);

// GET BY ID
router.get("/:id", getAssessmentById);

// UPDATE
router.put("/update/:id", updateAssessment);

// PUBLISH
router.put("/publish/:id", publishAssessment);

// DELETE
router.delete("/delete/:id", deleteAssessment);

module.exports = router;
