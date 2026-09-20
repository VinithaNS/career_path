const express = require("express");
const router = express.Router();
const {
  getActiveGroups,
  getAllGroups,
  getGroupById,
  createGroup
} = require("../controller/eleventhGroupController");

router.get("/active", getActiveGroups);
router.get("/all", getAllGroups);
router.post("/create", createGroup);
router.get("/:id", getGroupById);

module.exports = router;
