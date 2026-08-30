const express = require("express");

const router = express.Router();

const {
  createCollegeCourse,
  getAllCollegeCourses,
  getActiveCollegeCourses,
  getCollegeCourseById,
  getCoursesByCollege,
  getCoursesByType,
  searchCollegeCourses,
  updateCollegeCourse,
  deleteCollegeCourse
} = require("../controller/collegeCourseController");

// CREATE
router.post("/create", createCollegeCourse);

// GET ALL
router.get("/all", getAllCollegeCourses);

// GET ACTIVE
router.get("/active", getActiveCollegeCourses);

// SEARCH
router.get("/search", searchCollegeCourses);

// GET BY COLLEGE
router.get("/college/:collegeId", getCoursesByCollege);

// GET BY TYPE
router.get("/type/:courseType", getCoursesByType);

// GET BY ID
router.get("/:id", getCollegeCourseById);

// UPDATE
router.put("/update/:id", updateCollegeCourse);

// DELETE
router.delete("/delete/:id", deleteCollegeCourse);

module.exports = router;
