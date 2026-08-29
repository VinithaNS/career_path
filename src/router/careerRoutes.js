const express = require("express");

const router = express.Router();

const {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
  searchCareers,
  getFeaturedCareers
} = require("../controller/careerController");

// =====================================================
// CREATE CAREER
// =====================================================

router.post("/create", createCareer);

// =====================================================
// GET ALL CAREERS
// =====================================================

router.get("/all", getAllCareers);

// =====================================================
// SEARCH CAREERS
// IMPORTANT: Keep this BEFORE /:id
// =====================================================

router.get("/search", searchCareers);

// =====================================================
// GET FEATURED CAREERS
// =====================================================

router.get("/featured", getFeaturedCareers);

// =====================================================
// GET CAREER BY ID
// =====================================================

router.get("/:id", getCareerById);

// =====================================================
// UPDATE CAREER
// =====================================================

router.put("/update/:id", updateCareer);

// =====================================================
// DELETE CAREER
// =====================================================

router.delete("/delete/:id", deleteCareer);

module.exports = router;
