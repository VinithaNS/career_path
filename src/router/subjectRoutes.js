const express = require("express");

const router = express.Router();

const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} = require("../controller/subjectController");

router.post("/create", createSubject);

router.get("/all", getSubjects);

router.get("/:id", getSubjectById);

router.put("/update/:id", updateSubject);

router.delete("/delete/:id", deleteSubject);

module.exports = router;
