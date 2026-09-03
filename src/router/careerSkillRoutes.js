const express = require("express");

const router = express.Router();

const {
  createCareerSkill,
  getCareerSkills,
  getSkillsByCareer,
  getCareerSkillById,
  updateCareerSkill,
  deleteCareerSkill
} = require("../controller/careerSkillController");

router.post("/create", createCareerSkill);

router.get("/all", getCareerSkills);

router.get("/career/:careerId", getSkillsByCareer);

router.get("/:id", getCareerSkillById);

router.put("/update/:id", updateCareerSkill);

router.delete("/delete/:id", deleteCareerSkill);

module.exports = router;
