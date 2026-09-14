const departmentService = require("../services/departmentService");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.fetchAllDepartments();
    res
      .status(200)
      .json({ success: true, count: departments.length, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDepartmentBySlug = async (req, res) => {
  try {
    const department = await departmentService.fetchDepartmentBySlug(
      req.params.slug
    );
    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }
    res.status(200).json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const department = await departmentService.createDepartment(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, data: department });
  } catch (error) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    await departmentService.deactivateDepartment(req.params.id);
    res.status(200).json({ success: true, message: "Department deactivated" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
