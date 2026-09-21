const degreeCourseService = require("../services/degreeCourseService");

const getActiveDegreeCourses = async (req, res) => {
  try {
    const courses = await degreeCourseService.getActiveDegreeCourses();
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllDegreeCourses = async (req, res) => {
  try {
    const courses = await degreeCourseService.getAllDegreeCourses();
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDegreeCourseById = async (req, res) => {
  try {
    const course = await degreeCourseService.getDegreeCourseById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Degree course not found" });
    }
    return res.status(200).json({ success: true, data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCourseByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Course name is required" });
    }
    const course = await degreeCourseService.getCourseByName(name);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `No course matching '${name}' found`
      });
    }
    return res.status(200).json({ success: true, data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createDegreeCourse = async (req, res) => {
  try {
    const course = await degreeCourseService.createDegreeCourse(req.body);
    return res.status(201).json({ success: true, data: course });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getActiveDegreeCourses,
  getAllDegreeCourses,
  getDegreeCourseById,
  getCourseByName,
  createDegreeCourse
};
