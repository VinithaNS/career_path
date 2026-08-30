const express = require("express");

const router = express.Router();

const {
  createAssessmentCategory,
  getAllAssessmentCategories,
  getActiveAssessmentCategories,
  getAssessmentCategoryById,
  updateAssessmentCategory,
  deleteAssessmentCategory
} = require("../controller/assessmentCategoryController");

// CREATE
router.post("/create", createAssessmentCategory);

// GET ALL
router.get("/all", getAllAssessmentCategories);

// GET ACTIVE
router.get("/active", getActiveAssessmentCategories);

// GET BY ID
router.get("/:id", getAssessmentCategoryById);

// UPDATE
router.put("/update/:id", updateAssessmentCategory);

// DELETE
router.delete("/delete/:id", deleteAssessmentCategory);

module.exports = router;
