const express = require("express");

const router = express.Router();

const {
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher
} = require("../controller/teacherController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// CREATE TEACHER
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("teacher"),
  createTeacher
);

// GET TEACHER
router.get("/me", authMiddleware, roleMiddleware("teacher"), getTeacher);

// UPDATE TEACHER
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  updateTeacher
);

// DELETE TEACHER
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  deleteTeacher
);

module.exports = router;
