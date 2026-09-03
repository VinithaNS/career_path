const express = require("express");

const router = express.Router();

const {
  saveCareer,
  getAllSavedCareers,
  getSavedCareerById,
  getSavedCareersByStudent,
  checkSavedCareer,
  updateSavedCareer,
  removeSavedCareer,
  removeCareerForStudent
} = require("../controller/savedCareerController");

// =====================================================
// SAVE CAREER
// =====================================================

router.post("/create", saveCareer);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllSavedCareers);

// =====================================================
// GET BY STUDENT
// IMPORTANT: BEFORE /:id
// =====================================================

router.get("/student/:studentId", getSavedCareersByStudent);

// =====================================================
// CHECK SAVED CAREER
// =====================================================

router.get("/check/:studentId/:careerId", checkSavedCareer);

// =====================================================
// REMOVE CAREER FOR STUDENT
// =====================================================

router.delete("/student/:studentId/career/:careerId", removeCareerForStudent);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getSavedCareerById);

// =====================================================
// UPDATE
// =====================================================

router.put("/update/:id", updateSavedCareer);

// =====================================================
// REMOVE BY ID
// =====================================================

router.delete("/delete/:id", removeSavedCareer);

module.exports = router;
