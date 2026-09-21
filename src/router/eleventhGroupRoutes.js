const express = require("express");
const router = express.Router();
const {
  getAllEleventhGroups,
  getEleventhGroupById,
  createEleventhGroup
} = require("../controller/eleventhGroupController");

router.get("/active", getAllEleventhGroups);
router.get("/all", getAllEleventhGroups);
router.post("/create", createEleventhGroup);
router.get("/:id", getEleventhGroupById);

module.exports = router;
