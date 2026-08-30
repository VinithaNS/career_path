const express = require("express");

const router = express.Router();

const {
  createExamSyllabus,
  getAllExamSyllabus,
  getActiveExamSyllabus,
  getExamSyllabusById,
  getSyllabusByExam,
  updateExamSyllabus,
  deleteExamSyllabus
} = require("../controller/examSyllabusController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createExamSyllabus);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllExamSyllabus);

// =====================================================
// GET ACTIVE
// =====================================================

router.get("/active", getActiveExamSyllabus);

// =====================================================
// GET BY GOVERNMENT EXAM
// =====================================================

router.get("/exam/:examId", getSyllabusByExam);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getExamSyllabusById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateExamSyllabus);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteExamSyllabus);

module.exports = router;
