const express = require("express");
const router = express.Router();
const degreeCourseController = require("../controller/degreeCourseController");

router.get("/active", degreeCourseController.getActiveDegreeCourses);
router.get("/all", degreeCourseController.getAllDegreeCourses);
router.get("/by-name", degreeCourseController.getCourseByName); // <-- MUST be before /:id
router.post("/create", degreeCourseController.createDegreeCourse);
router.get("/:id", degreeCourseController.getDegreeCourseById);

module.exports = router;
