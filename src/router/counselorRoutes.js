const express = require("express");

const router = express.Router();

const {
  createCounselor,
  getCounselor,
  updateCounselor,
  deleteCounselor
} = require("../controller/counselorController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// CREATE
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("counselor"),
  createCounselor
);

// GET
router.get("/me", authMiddleware, roleMiddleware("counselor"), getCounselor);

// UPDATE
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("counselor"),
  updateCounselor
);

// DELETE
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("counselor"),
  deleteCounselor
);

module.exports = router;
