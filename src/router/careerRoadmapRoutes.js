const express = require("express");

const router = express.Router();

const {
  createCareerRoadmap,
  getAllCareerRoadmaps,
  getCareerRoadmapById,
  getRoadmapByCareer,
  updateCareerRoadmap,
  deleteCareerRoadmap
} = require("../controller/careerRoadmapController");

// =====================================================
// CREATE CAREER ROADMAP
// =====================================================

router.post("/create", createCareerRoadmap);

// =====================================================
// GET ALL CAREER ROADMAPS
// =====================================================

router.get("/all", getAllCareerRoadmaps);

// =====================================================
// GET ROADMAP BY CAREER ID
// IMPORTANT: Keep this BEFORE /:id
// =====================================================

router.get("/career/:careerId", getRoadmapByCareer);

// =====================================================
// GET ROADMAP BY ID
// =====================================================

router.get("/:id", getCareerRoadmapById);

// =====================================================
// UPDATE CAREER ROADMAP
// =====================================================

router.put("/update/:id", updateCareerRoadmap);

// =====================================================
// DELETE CAREER ROADMAP
// =====================================================

router.delete("/delete/:id", deleteCareerRoadmap);

module.exports = router;
