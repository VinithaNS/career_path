const express = require("express");
const router = express.Router();

const {
  getAllDepartments,
  getDepartmentBySlug,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require("../controller/departmentController");

router.get("/all", getAllDepartments);
router.get("/:slug", getDepartmentBySlug);
router.post("/create", createDepartment);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);

module.exports = router;
