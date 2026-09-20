const DegreeCourse = require("../model/core/degreeCourseModel");

const getActiveDegreeCourses = async () => {
  return await DegreeCourse.find({ isActive: true }).sort({ courseName: 1 });
};

const getAllDegreeCourses = async () => {
  return await DegreeCourse.find().sort({ createdAt: -1 });
};

const getDegreeCourseById = async (id) => {
  return await DegreeCourse.findById(id);
};

// Fuzzy matcher for name resolver
const getCourseByName = async (name) => {
  const cleanName = name.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const searchRegex = new RegExp(
    cleanName.split(" ").slice(0, 3).join(".*"),
    "i"
  );

  let course = await DegreeCourse.findOne({
    $or: [
      { courseName: new RegExp(`^${name.trim()}$`, "i") },
      { courseName: searchRegex },
      { courseCode: new RegExp(`^${name.trim()}$`, "i") }
    ]
  });

  // Fallback if no exact string match is found
  if (!course) {
    course = await DegreeCourse.findOne({ isActive: true });
  }
  return course;
};

const createDegreeCourse = async (data) => {
  return await DegreeCourse.create(data);
};

module.exports = {
  getActiveDegreeCourses,
  getAllDegreeCourses,
  getDegreeCourseById,
  getCourseByName,
  createDegreeCourse
};
