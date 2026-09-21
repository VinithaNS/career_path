const diplomaCourseService = require("../services/diplomaCourseService");

const getAllDiplomaCourses = async (req, res) => {
  try {
    const diplomas = await diplomaCourseService.getAllDiplomaCourses();
    return res
      .status(200)
      .json({ success: true, count: diplomas.length, data: diplomas });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDiplomaCourseById = async (req, res) => {
  try {
    const diploma = await diplomaCourseService.getDiplomaCourseById(
      req.params.id
    );
    if (!diploma) {
      return res
        .status(404)
        .json({ success: false, message: "Diploma Course not found" });
    }
    return res.status(200).json({ success: true, data: diploma });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createDiplomaCourse = async (req, res) => {
  try {
    const diploma = await diplomaCourseService.createDiplomaCourse(req.body);
    return res.status(201).json({ success: true, data: diploma });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllDiplomaCourses,
  getDiplomaCourseById,
  createDiplomaCourse
};
