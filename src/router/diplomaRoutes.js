const express = require("express");
const router = express.Router();

const {
  getActiveDiplomaCourses,
  getAllDiplomaCourses,
  getDiplomaCourseById,
  createDiplomaCourse,
  updateDiplomaCourse,
  deleteDiplomaCourse
} = require("../controller/diplomaController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// Public
router.get("/active", getActiveDiplomaCourses);
router.get("/all", getAllDiplomaCourses);
router.get("/:id", getDiplomaCourseById);

// Admin only
router.post("/create", authMiddleware, roleMiddleware, createDiplomaCourse);
router.put("/:id", authMiddleware, roleMiddleware, updateDiplomaCourse);
router.delete("/:id", authMiddleware, roleMiddleware, deleteDiplomaCourse);

module.exports = router;
