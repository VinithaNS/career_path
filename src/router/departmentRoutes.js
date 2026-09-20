const express = require("express");
const router = express.Router();
const {
  getAllDepartments,
  getDepartmentBySlug,
  createDepartment
} = require("../controller/departmentController");

router.get("/all", getAllDepartments);
router.get("/", getAllDepartments);
router.post("/create", createDepartment);
router.get("/:slug", getDepartmentBySlug);

module.exports = router;
