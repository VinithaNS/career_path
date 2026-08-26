const express = require("express");

const {
  createParent,
  getMyProfile,
  updateParent,
  deleteParent
} = require("../controller/parentController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// CREATE
router.post("/create", authMiddleware, roleMiddleware("parent"), createParent);

// GET MY PROFILE
router.get("/me", authMiddleware, roleMiddleware("parent"), getMyProfile);

// UPDATE
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("parent"),
  updateParent
);

// DELETE
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("parent"),
  deleteParent
);

module.exports = router;
