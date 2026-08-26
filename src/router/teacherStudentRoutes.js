const express = require("express");

const router = express.Router();

const {
  assignStudent,
  getMyStudents,
  getMyStudent,
  updateAssignment,
  removeStudent
} = require("../controller/teacherStudentController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// ASSIGN STUDENT
router.post(
  "/assign",
  authMiddleware,
  roleMiddleware("teacher"),
  assignStudent
);

// GET ALL STUDENTS
router.get(
  "/my-students",
  authMiddleware,
  roleMiddleware("teacher"),
  getMyStudents
);

// GET ONE STUDENT
router.get(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware("teacher"),
  getMyStudent
);

// UPDATE
router.put(
  "/update/:studentId",
  authMiddleware,
  roleMiddleware("teacher"),
  updateAssignment
);

// REMOVE
router.delete(
  "/delete/:studentId",
  authMiddleware,
  roleMiddleware("teacher"),
  removeStudent
);

module.exports = router;
