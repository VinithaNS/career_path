const express = require("express");

const router = express.Router();

const {
  createCollegeYearRoadmap,
  getCollegeYearRoadmaps,
  getCollegeYearRoadmapById,
  getRoadmapByCourse,
  getRoadmapByCourseAndYear,
  updateCollegeYearRoadmap,
  deleteCollegeYearRoadmap
} = require("../controller/collegeYearRoadmapController");

router.post("/create", createCollegeYearRoadmap);

router.get("/all", getCollegeYearRoadmaps);

router.get("/course/:courseId", getRoadmapByCourse);

router.get("/course/:courseId/year/:year", getRoadmapByCourseAndYear);

router.get("/:id", getCollegeYearRoadmapById);

router.put("/update/:id", updateCollegeYearRoadmap);

router.delete("/delete/:id", deleteCollegeYearRoadmap);

module.exports = router;
