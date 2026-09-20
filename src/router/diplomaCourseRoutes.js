const express = require("express");
const router = express.Router();
const {
  getAllDiplomaCourses,
  getActiveDiplomaCourses,
  getDiplomaCourseById,
  createDiplomaCourse
} = require("../controller/diplomaCourseController");

router.get("/active", getActiveDiplomaCourses);
router.get("/all", getAllDiplomaCourses);
router.post("/create", createDiplomaCourse);
router.get("/:id", getDiplomaCourseById);

module.exports = router;
