const departmentService = require("../services/departmentService");

const getAllDepartments = async (req, res) => {
  try {
    const depts = await departmentService.getAllDepartments();
    return res
      .status(200)
      .json({ success: true, count: depts.length, data: depts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDepartmentBySlug = async (req, res) => {
  try {
    const dept = await departmentService.getDepartmentBySlug(req.params.slug);
    if (!dept) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }
    return res.status(200).json({ success: true, data: dept });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    const dept = await departmentService.createDepartment(req.body);
    return res.status(201).json({ success: true, data: dept });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentBySlug,
  createDepartment
};
