const diplomaCourseService = require("../services/diplomaCourseService");

const getAllDiplomaCourses = async (req, res) => {
  try {
    const courses = await diplomaCourseService.getAllDiplomaCourses(req.query);
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getActiveDiplomaCourses = async (req, res) => {
  try {
    const courses = await diplomaCourseService.getActiveDiplomaCourses();
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDiplomaCourseById = async (req, res) => {
  try {
    const course = await diplomaCourseService.getDiplomaCourseById(
      req.params.id
    );
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Diploma course not found" });
    }
    return res.status(200).json({ success: true, data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createDiplomaCourse = async (req, res) => {
  try {
    const course = await diplomaCourseService.createDiplomaCourse(req.body);
    return res.status(201).json({ success: true, data: course });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllDiplomaCourses,
  getActiveDiplomaCourses,
  getDiplomaCourseById,
  createDiplomaCourse
};
