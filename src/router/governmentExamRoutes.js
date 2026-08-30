const express = require("express");

const router = express.Router();

const {
  createGovernmentExam,
  getAllGovernmentExams,
  getActiveGovernmentExams,
  getGovernmentExamById,
  searchGovernmentExams,
  getExamsByCareer,
  getExamsBySkill,
  updateGovernmentExam,
  deleteGovernmentExam
} = require("../controller/governmentExamController");

// CREATE
router.post("/create", createGovernmentExam);

// GET ALL
router.get("/all", getAllGovernmentExams);

// GET ACTIVE
router.get("/active", getActiveGovernmentExams);

// SEARCH
router.get("/search", searchGovernmentExams);

// GET BY CAREER
router.get("/career/:careerId", getExamsByCareer);

// GET BY SKILL
router.get("/skill/:skillId", getExamsBySkill);

// GET BY ID
router.get("/:id", getGovernmentExamById);

// UPDATE
router.put("/update/:id", updateGovernmentExam);

// DELETE
router.delete("/delete/:id", deleteGovernmentExam);

module.exports = router;
