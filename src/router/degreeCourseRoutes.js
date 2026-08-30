const express = require("express");

const router = express.Router();

const {
  createDegreeCourse,
  getAllDegreeCourses,
  getActiveDegreeCourses,
  getDegreeCourseById,
  getDegreeCoursesByCategory,
  searchDegreeCourses,
  updateDegreeCourse,
  deleteDegreeCourse
} = require("../controller/degreeCourseController");

// =====================================================
// CREATE DEGREE COURSE
// =====================================================

router.post("/create", createDegreeCourse);

// =====================================================
// GET ALL DEGREE COURSES
// =====================================================

router.get("/all", getAllDegreeCourses);

// =====================================================
// GET ACTIVE DEGREE COURSES
// =====================================================

router.get("/active", getActiveDegreeCourses);

// =====================================================
// SEARCH DEGREE COURSES
// =====================================================

router.get("/search", searchDegreeCourses);

// =====================================================
// GET BY CATEGORY
// =====================================================

router.get("/category/:categoryId", getDegreeCoursesByCategory);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getDegreeCourseById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateDegreeCourse);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteDegreeCourse);

module.exports = router;
