const express = require("express");

const router = express.Router();

const {
  createStudentProgress,
  getAllStudentProgress,
  getStudentProgressById,
  getProgressByStudent,
  updateStudentProgress,
  updateOverallProgress,
  updateRoadmapProgress,
  updateCurrentStage,
  deleteStudentProgress
} = require("../controller/studentProgressController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createStudentProgress);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllStudentProgress);

// =====================================================
// GET BY STUDENT
// IMPORTANT: Keep before /:id
// =====================================================

router.get("/student/:studentId", getProgressByStudent);

// =====================================================
// UPDATE OVERALL PROGRESS
// =====================================================

router.patch("/overall-progress/:id", updateOverallProgress);

// =====================================================
// UPDATE ROADMAP PROGRESS
// =====================================================

router.patch("/roadmap-progress/:id", updateRoadmapProgress);

// =====================================================
// UPDATE CURRENT STAGE
// =====================================================

router.patch("/stage/:id", updateCurrentStage);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getStudentProgressById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateStudentProgress);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteStudentProgress);

module.exports = router;
