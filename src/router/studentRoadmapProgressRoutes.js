const express = require("express");

const router = express.Router();

const {
  createRoadmapProgress,
  getRoadmapProgress,
  getRoadmapProgressById,
  getRoadmapProgressByStudent,
  updateRoadmapProgress,
  deleteRoadmapProgress
} = require("../controller/studentRoadmapProgressController");

router.post("/create", createRoadmapProgress);

router.get("/all", getRoadmapProgress);

router.get("/student/:studentId", getRoadmapProgressByStudent);

router.get("/:id", getRoadmapProgressById);

router.put("/update/:id", updateRoadmapProgress);

router.delete("/delete/:id", deleteRoadmapProgress);

module.exports = router;
