const express = require("express");

const router = express.Router();

const {
  createEducationPath,
  getEducationPaths,
  getEducationPathById,
  updateEducationPath,
  deleteEducationPath
} = require("../controller/educationPathController");

router.post("/create", createEducationPath);

router.get("/all", getEducationPaths);

router.get("/:id", getEducationPathById);

router.put("/update/:id", updateEducationPath);

router.delete("/delete/:id", deleteEducationPath);

module.exports = router;
