const express = require("express");

const router = express.Router();

const {
  createCollegeComparison,
  getAllCollegeComparisons,
  getActiveCollegeComparisons,
  getCollegeComparisonById,
  updateCollegeComparison,
  deleteCollegeComparison
} = require("../controller/collegeComparisonController");

// CREATE
router.post("/create", createCollegeComparison);

// GET ALL
router.get("/all", getAllCollegeComparisons);

// GET ACTIVE
router.get("/active", getActiveCollegeComparisons);

// GET BY ID
router.get("/:id", getCollegeComparisonById);

// UPDATE
router.put("/update/:id", updateCollegeComparison);

// DELETE
router.delete("/delete/:id", deleteCollegeComparison);

module.exports = router;
