const express = require("express");

const router = express.Router();

const {
  createProject,
  getAllProjects,
  getActiveProjects,
  getProjectById,
  searchProjects,
  getProjectsBySkill,
  getProjectsByCareer,
  updateProject,
  deleteProject
} = require("../controller/projectController");

// =====================================================
// CREATE PROJECT
// =====================================================

router.post("/create", createProject);

// =====================================================
// GET ALL PROJECTS
// =====================================================

router.get("/all", getAllProjects);

// =====================================================
// GET ACTIVE PROJECTS
// =====================================================

router.get("/active", getActiveProjects);

// =====================================================
// SEARCH PROJECTS
// =====================================================

router.get("/search", searchProjects);

// =====================================================
// GET PROJECTS BY SKILL
// =====================================================

router.get("/skill/:skillId", getProjectsBySkill);

// =====================================================
// GET PROJECTS BY CAREER
// =====================================================

router.get("/career/:careerId", getProjectsByCareer);

// =====================================================
// GET PROJECT BY ID
// =====================================================

router.get("/:id", getProjectById);

// =====================================================
// UPDATE PROJECT
// =====================================================

router.put("/update/:id", updateProject);

// =====================================================
// DELETE PROJECT
// =====================================================

router.delete("/delete/:id", deleteProject);

module.exports = router;
