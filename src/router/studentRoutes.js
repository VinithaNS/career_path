const express = require("express");

const {
  createStudent,
  getMyProfile,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../controller/studentController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create profile
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("student"),
  createStudent
);

// My profile
router.get("/me", authMiddleware, roleMiddleware("student"), getMyProfile);

// Update profile
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("student"),
  updateStudent
);

// Delete profile
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("student"),
  deleteStudent
);

// Get student by ID
router.get("/:id", authMiddleware, getStudentById);

module.exports = router;
