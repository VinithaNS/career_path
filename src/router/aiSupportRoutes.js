const express = require("express");

const router = express.Router();

const {
  createSupport,
  getSupportById,
  getStudentSupports,
  updateSupportStatus,
  deleteSupport
} = require("../controller/aiSupportController");

// Create Support
router.post("/create", createSupport);

// Get Student Supports
router.get("/student/:studentId", getStudentSupports);

// Update Status
router.patch("/:id/status", updateSupportStatus);

// Get Support By ID
router.get("/:id", getSupportById);

// Delete Support
router.delete("/delete/:id", deleteSupport);

module.exports = router;
