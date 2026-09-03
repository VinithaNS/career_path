const express = require("express");

const router = express.Router();

const {
  createCareerEligibility,
  getCareerEligibilities,
  getCareerEligibilityById,
  getCareersByGroup,
  updateCareerEligibility,
  deleteCareerEligibility
} = require("../controller/careerEligibilityController");

router.post("/create", createCareerEligibility);

router.get("/all", getCareerEligibilities);

router.get("/group/:groupId", getCareersByGroup);

router.get("/:id", getCareerEligibilityById);

router.put("/update/:id", updateCareerEligibility);

router.delete("/delete/:id", deleteCareerEligibility);

module.exports = router;
