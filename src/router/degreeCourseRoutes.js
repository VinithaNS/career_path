const express = require("express");
const router = express.Router();
const {
  getActiveDegreeCourses,
  getAllDegreeCourses,
  getCourseByName,
  getDegreeCourseById,
  createDegreeCourse
} = require("../controller/degreeCourseController");

router.get("/active", getActiveDegreeCourses);
router.get("/all", getAllDegreeCourses);
router.get("/by-name", getCourseByName);
router.post("/create", createDegreeCourse);
router.get("/:id", getDegreeCourseById);

module.exports = router;
