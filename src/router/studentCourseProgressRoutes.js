const express = require("express");

const router = express.Router();

const {
  createCourseProgress,
  getCourseProgress,
  getCourseProgressById,
  getProgressByStudent,
  updateCourseProgress,
  deleteCourseProgress
} = require("../controller/studentCourseProgressController");

router.post("/create", createCourseProgress);

router.get("/all", getCourseProgress);

router.get("/student/:studentId", getProgressByStudent);

router.get("/:id", getCourseProgressById);

router.put("/update/:id", updateCourseProgress);

router.delete("/delete/:id", deleteCourseProgress);

module.exports = router;
