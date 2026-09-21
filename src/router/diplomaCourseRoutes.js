const express = require("express");
const router = express.Router();
const {
  getAllDiplomaCourses,
  getDiplomaCourseById,
  createDiplomaCourse
} = require("../controller/diplomaCourseController");

router.get("/all", getAllDiplomaCourses);
router.post("/create", createDiplomaCourse);
router.get("/:id", getDiplomaCourseById);

module.exports = router;
