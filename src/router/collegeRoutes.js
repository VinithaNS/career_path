const express = require("express");

const router = express.Router();

const {
  createCollege,
  getAllColleges,
  getActiveColleges,
  getCollegeById,
  searchColleges,
  getCollegesByState,
  getCollegesByCity,
  updateCollege,
  deleteCollege
} = require("../controller/collegeController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createCollege);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllColleges);

// =====================================================
// GET ACTIVE
// =====================================================

router.get("/active", getActiveColleges);

// =====================================================
// SEARCH
// =====================================================

router.get("/search", searchColleges);

// =====================================================
// GET BY STATE
// =====================================================

router.get("/state/:state", getCollegesByState);

// =====================================================
// GET BY CITY
// =====================================================

router.get("/city/:city", getCollegesByCity);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getCollegeById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateCollege);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteCollege);

module.exports = router;
