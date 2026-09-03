const express = require("express");

const router = express.Router();

const {
  createOrUpdateInterest,
  getStudentInterest,
  updateStudentInterest,
  deleteStudentInterest
} = require("../controller/studentInterestController");

router.post("/create", createOrUpdateInterest);

router.get("/student/:studentId", getStudentInterest);

router.put("/student/:studentId", updateStudentInterest);

router.delete("/student/:studentId", deleteStudentInterest);

module.exports = router;
