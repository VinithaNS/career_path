const express = require("express");

const router = express.Router();

const {
  createCertification,
  getAllCertifications,
  getActiveCertifications,
  getCertificationById,
  searchCertifications,
  getCertificationsBySkill,
  updateCertification,
  deleteCertification
} = require("../controller/certificationController");

// CREATE
router.post("/create", createCertification);

// GET ALL
router.get("/all", getAllCertifications);

// GET ACTIVE
router.get("/active", getActiveCertifications);

// SEARCH
router.get("/search", searchCertifications);

// GET BY SKILL
router.get("/skill/:skillId", getCertificationsBySkill);

// GET BY ID
router.get("/:id", getCertificationById);

// UPDATE
router.put("/update/:id", updateCertification);

// DELETE
router.delete("/delete/:id", deleteCertification);

module.exports = router;
