const Department = require("../model/core/departmentModel");

const getAllDepartments = async () => {
  return await Department.find({ isActive: true })
    .select(
      "departmentName code slug description iconUrl degreesOffered displayOrder"
    )
    .sort({ displayOrder: 1, departmentName: 1 });
};

const getDepartmentBySlug = async (slug) => {
  return await Department.findOne({ slug: slug.toLowerCase() })
    .populate({
      path: "eligibleEleventhGroups",
      select: "groupName groupCode",
      strictPopulate: false
    })
    .populate({
      path: "degreeCoursesOffered",
      select: "courseName courseCode duration",
      strictPopulate: false
    })
    .populate({
      path: "careerRoadmaps",
      select: "title duration",
      strictPopulate: false
    });
};

const createDepartment = async (data) => {
  return await Department.create(data);
};

module.exports = {
  getAllDepartments,
  getDepartmentBySlug,
  createDepartment
};
