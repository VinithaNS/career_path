const express = require("express");
const router = express.Router();
const {
  getAllRoadmaps,
  getRoadmapById,
  getRoadmapByTitle,
  createRoadmap,
  updateRoadmapStep
} = require("../controller/careerRoadmapController");

router.get("/all", getAllRoadmaps);
router.get("/by-title", getRoadmapByTitle);
router.post("/create", createRoadmap);
router.put("/:id/step/:stepId", updateRoadmapStep);
router.get("/:id", getRoadmapById);

module.exports = router;
