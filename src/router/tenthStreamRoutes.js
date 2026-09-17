const express = require("express");
const router = express.Router();

const {
  getActiveTenthStreams,
  getAllTenthStreams,
  getTenthStreamById,
  createTenthStream,
  updateTenthStream,
  deleteTenthStream
} = require("../controller/tenthStreamController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// Public
router.get("/active", getActiveTenthStreams);
router.get("/all", getAllTenthStreams);
router.get("/:id", getTenthStreamById);

// Admin only
router.post("/create", authMiddleware, roleMiddleware, createTenthStream);
router.put("/:id", authMiddleware, roleMiddleware, updateTenthStream);
router.delete("/:id", authMiddleware, roleMiddleware, deleteTenthStream);

module.exports = router;
