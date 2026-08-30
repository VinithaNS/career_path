const diplomaCourseService = require("../services/diplomaCourseService");

// =====================================================
// CREATE DIPLOMA COURSE
// =====================================================

const createDiplomaCourse = async (req, res) => {
  try {
    const course = await diplomaCourseService.createDiplomaCourse(req.body);

    return res.status(201).json({
      success: true,
      message: "Diploma course created successfully",
      data: course
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL DIPLOMA COURSES
// =====================================================

const getAllDiplomaCourses = async (req, res) => {
  try {
    const courses = await diplomaCourseService.getAllDiplomaCourses();

    return res.status(200).json({
      success: true,
      message: "Diploma courses fetched successfully",
      data: courses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE DIPLOMA COURSES
// =====================================================

const getActiveDiplomaCourses = async (req, res) => {
  try {
    const courses = await diplomaCourseService.getActiveDiplomaCourses();

    return res.status(200).json({
      success: true,
      message: "Active diploma courses fetched successfully",
      data: courses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET DIPLOMA COURSE BY ID
// =====================================================

const getDiplomaCourseById = async (req, res) => {
  try {
    const course = await diplomaCourseService.getDiplomaCourseById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Diploma course fetched successfully",
      data: course
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET COURSES BY CATEGORY
// =====================================================

const getDiplomaCoursesByCategory = async (req, res) => {
  try {
    const courses = await diplomaCourseService.getDiplomaCoursesByCategory(
      req.params.categoryId
    );

    return res.status(200).json({
      success: true,
      message: "Diploma courses fetched successfully",
      data: courses
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEARCH DIPLOMA COURSES
// =====================================================

const searchDiplomaCourses = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const courses = await diplomaCourseService.searchDiplomaCourses(search);

    return res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: courses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE DIPLOMA COURSE
// =====================================================

const updateDiplomaCourse = async (req, res) => {
  try {
    const course = await diplomaCourseService.updateDiplomaCourse(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Diploma course updated successfully",
      data: course
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE DIPLOMA COURSE
// =====================================================

const deleteDiplomaCourse = async (req, res) => {
  try {
    const result = await diplomaCourseService.deleteDiplomaCourse(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createDiplomaCourse,

  getAllDiplomaCourses,

  getActiveDiplomaCourses,

  getDiplomaCourseById,

  getDiplomaCoursesByCategory,

  searchDiplomaCourses,

  updateDiplomaCourse,

  deleteDiplomaCourse
};
