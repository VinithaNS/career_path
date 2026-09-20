const express = require("express");
const router = express.Router();
const careerRoadmapController = require("../controller/careerRoadmapController");

// Named and static routes precede wildcard /:id
router.get("/all", careerRoadmapController.getAllRoadmaps);
router.get("/by-title", careerRoadmapController.getRoadmapByTitle);
router.post("/create", careerRoadmapController.createRoadmap);
router.put("/:id/step/:stepId", careerRoadmapController.updateRoadmapStep);
router.get("/:id", careerRoadmapController.getRoadmapById);

module.exports = router;
