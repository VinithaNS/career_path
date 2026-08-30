const express = require("express");

const router = express.Router();

const {
  createDiplomaCourse,
  getAllDiplomaCourses,
  getActiveDiplomaCourses,
  getDiplomaCourseById,
  getDiplomaCoursesByCategory,
  searchDiplomaCourses,
  updateDiplomaCourse,
  deleteDiplomaCourse
} = require("../controller/diplomaCourseController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createDiplomaCourse);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllDiplomaCourses);

// =====================================================
// GET ACTIVE
// =====================================================

router.get("/active", getActiveDiplomaCourses);

// =====================================================
// SEARCH
// =====================================================

router.get("/search", searchDiplomaCourses);

// =====================================================
// GET BY CATEGORY
// =====================================================

router.get("/category/:categoryId", getDiplomaCoursesByCategory);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getDiplomaCourseById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateDiplomaCourse);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteDiplomaCourse);

module.exports = router;
