const express = require("express");

const {
  linkStudent,
  getMyChildren,
  getChildById,
  unlinkStudent
} = require("../controller/parentStudentController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// LINK STUDENT
router.post("/link", authMiddleware, roleMiddleware("parent"), linkStudent);

// GET ALL CHILDREN
router.get(
  "/my-children",
  authMiddleware,
  roleMiddleware("parent"),
  getMyChildren
);

// GET ONE CHILD
router.get(
  "/child/:studentId",
  authMiddleware,
  roleMiddleware("parent"),
  getChildById
);

// UNLINK
router.delete(
  "/unlink/:studentId",
  authMiddleware,
  roleMiddleware("parent"),
  unlinkStudent
);

module.exports = router;
