const Department = require("../model/departmentModel");

exports.fetchAllDepartments = async () => {
  return Department.find({ isActive: true })
    .sort({ order: 1 })
    .select("name slug shortCode tags icon description");
};

exports.fetchDepartmentBySlug = async (slug) => {
  return Department.findOne({ slug, isActive: true })
    .populate("careerRoadmaps")
    .populate("collegeCourses")
    .populate("degreeCourses");
};

exports.createDepartment = async (payload) => {
  const exists = await Department.findOne({ slug: payload.slug });
  if (exists) {
    const err = new Error("A department with this slug already exists");
    err.statusCode = 409;
    throw err;
  }
  return Department.create(payload);
};

exports.updateDepartment = async (id, payload) => {
  const department = await Department.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
  if (!department) {
    const err = new Error("Department not found");
    err.statusCode = 404;
    throw err;
  }
  return department;
};

exports.deactivateDepartment = async (id) => {
  const department = await Department.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!department) {
    const err = new Error("Department not found");
    err.statusCode = 404;
    throw err;
  }
  return department;
};

exports.attachRoadmapToDepartment = async (departmentId, roadmapId) => {
  return Department.findByIdAndUpdate(
    departmentId,
    { $addToSet: { careerRoadmaps: roadmapId } },
    { new: true }
  );
};
