const express = require("express");

const router = express.Router();

const {
  createEleventhGroup,
  getAllEleventhGroups,
  getActiveEleventhGroups,
  getEleventhGroupById,
  getGroupsByCategory,
  updateEleventhGroup,
  deleteEleventhGroup
} = require("../controller/eleventhGroupController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createEleventhGroup);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllEleventhGroups);

// =====================================================
// GET ACTIVE
// =====================================================

router.get("/active", getActiveEleventhGroups);

// =====================================================
// GET BY CATEGORY
// =====================================================

router.get("/category/:categoryId", getGroupsByCategory);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getEleventhGroupById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateEleventhGroup);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteEleventhGroup);

module.exports = router;
