const express = require("express");

const router = express.Router();

const {
  createSkillRoadmap,
  getAllSkillRoadmaps,
  getActiveSkillRoadmaps,
  getSkillRoadmapById,
  getRoadmapsBySkill,
  searchSkillRoadmaps,
  updateSkillRoadmap,
  deleteSkillRoadmap
} = require("../controller/skillRoadmapController");

// CREATE
router.post("/create", createSkillRoadmap);

// GET ALL
router.get("/all", getAllSkillRoadmaps);

// GET ACTIVE
router.get("/active", getActiveSkillRoadmaps);

// SEARCH
router.get("/search", searchSkillRoadmaps);

// GET BY SKILL
router.get("/skill/:skillId", getRoadmapsBySkill);

// GET BY ID
router.get("/:id", getSkillRoadmapById);

// UPDATE
router.put("/update/:id", updateSkillRoadmap);

// DELETE
router.delete("/delete/:id", deleteSkillRoadmap);

module.exports = router;
