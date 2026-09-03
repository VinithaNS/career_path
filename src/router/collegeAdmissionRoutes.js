const express = require("express");

const router = express.Router();

const {
  createCollegeAdmission,
  getCollegeAdmissions,
  getCollegeAdmissionById,
  getAdmissionsByCollege,
  getAdmissionsByCourse,
  updateCollegeAdmission,
  deleteCollegeAdmission
} = require("../controller/collegeAdmissionController.js");

router.post("/create", createCollegeAdmission);

router.get("/all", getCollegeAdmissions);

router.get("/college/:collegeId", getAdmissionsByCollege);

router.get("/course/:courseId", getAdmissionsByCourse);

router.get("/:id", getCollegeAdmissionById);

router.put("/update/:id", updateCollegeAdmission);

router.delete("/delete/:id", deleteCollegeAdmission);

module.exports = router;
