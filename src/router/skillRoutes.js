const express = require("express");

const router = express.Router();

const {
  createSkill,
  getAllSkills,
  getActiveSkills,
  getSkillById,
  getSkillsByCategory,
  searchSkills,
  updateSkill,
  deleteSkill
} = require("../controller/skillController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createSkill);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllSkills);

// =====================================================
// GET ACTIVE
// =====================================================

router.get("/active", getActiveSkills);

// =====================================================
// SEARCH
// =====================================================

router.get("/search", searchSkills);

// =====================================================
// GET BY CATEGORY
// =====================================================

router.get("/category/:categoryId", getSkillsByCategory);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getSkillById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateSkill);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteSkill);

module.exports = router;
