const express = require("express");
const router = express.Router();
const {
  getAllRoadmaps,
  getRoadmapById,
  getRoadmapByTitle,
  createRoadmap
} = require("../controller/careerRoadmapController");

// Static and Named resolver routes must precede the wildcard /:id
router.get("/all", getAllRoadmaps);
router.get("/by-title", getRoadmapByTitle);
router.post("/create", createRoadmap);
router.get("/:id", getRoadmapById);

module.exports = router;
