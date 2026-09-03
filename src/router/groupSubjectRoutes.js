const express = require("express");

const router = express.Router();

const {
  createGroupSubject,
  getGroupSubjects,
  getSubjectsByGroup,
  updateGroupSubject,
  deleteGroupSubject
} = require("../controller/groupSubjectController");

router.post("/create", createGroupSubject);

router.get("/all", getGroupSubjects);

router.get("/group/:groupId", getSubjectsByGroup);

router.put("/update/:id", updateGroupSubject);

router.delete("/delete/:id", deleteGroupSubject);

module.exports = router;
