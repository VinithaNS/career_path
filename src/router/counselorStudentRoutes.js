const express = require("express");

const router = express.Router();

const {
  assignStudent,
  getMyStudents,
  getMyStudent,
  updateAssignment,
  removeStudent
} = require("../controller/counselorStudentController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// ASSIGN
router.post(
  "/assign",
  authMiddleware,
  roleMiddleware("counselor"),
  assignStudent
);

// GET ALL
router.get(
  "/my-students",
  authMiddleware,
  roleMiddleware("counselor"),
  getMyStudents
);

// GET ONE
router.get(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware("counselor"),
  getMyStudent
);

// UPDATE
router.put(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware("counselor"),
  updateAssignment
);

// REMOVE
router.delete(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware("counselor"),
  removeStudent
);

module.exports = router;
