const express = require("express");

const router = express.Router();

const {
  createAIReplace,
  getAllAIReplacements,
  getAIReplaceById,
  getBySector,
  getByDomain,
  getHighAutomationJobs,
  updateAIReplace,
  deleteAIReplace
} = require("../controller/aiReplaceController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createAIReplace);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllAIReplacements);

// =====================================================
// HIGH AUTOMATION
// =====================================================

router.get("/high-automation", getHighAutomationJobs);

// =====================================================
// GET BY SECTOR
// =====================================================

router.get("/sector/:sector", getBySector);

// =====================================================
// GET BY DOMAIN
// =====================================================

router.get("/domain/:domain", getByDomain);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getAIReplaceById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateAIReplace);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteAIReplace);

module.exports = router;
