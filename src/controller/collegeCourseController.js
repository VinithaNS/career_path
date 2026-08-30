const collegeCourseService = require("../services/collegeCourseService");

// =====================================================
// CREATE
// =====================================================

const createCollegeCourse = async (req, res) => {
  try {
    const course = await collegeCourseService.createCollegeCourse(req.body);

    return res.status(201).json({
      success: true,
      message: "College course created successfully",
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
// GET ALL
// =====================================================

const getAllCollegeCourses = async (req, res) => {
  try {
    const courses = await collegeCourseService.getAllCollegeCourses();

    return res.status(200).json({
      success: true,
      message: "College courses fetched successfully",
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
// GET ACTIVE
// =====================================================

const getActiveCollegeCourses = async (req, res) => {
  try {
    const courses = await collegeCourseService.getActiveCollegeCourses();

    return res.status(200).json({
      success: true,
      message: "Active college courses fetched successfully",
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
// GET BY ID
// =====================================================

const getCollegeCourseById = async (req, res) => {
  try {
    const course = await collegeCourseService.getCollegeCourseById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "College course fetched successfully",
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
// GET BY COLLEGE
// =====================================================

const getCoursesByCollege = async (req, res) => {
  try {
    const courses = await collegeCourseService.getCoursesByCollege(
      req.params.collegeId
    );

    return res.status(200).json({
      success: true,
      message: "College courses fetched successfully",
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
// GET BY TYPE
// =====================================================

const getCoursesByType = async (req, res) => {
  try {
    const courses = await collegeCourseService.getCoursesByType(
      req.params.courseType
    );

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
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
// SEARCH
// =====================================================

const searchCollegeCourses = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const courses = await collegeCourseService.searchCollegeCourses(search);

    return res.status(200).json({
      success: true,
      message: "Course search completed successfully",
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
// UPDATE
// =====================================================

const updateCollegeCourse = async (req, res) => {
  try {
    const course = await collegeCourseService.updateCollegeCourse(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "College course updated successfully",
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
// DELETE
// =====================================================

const deleteCollegeCourse = async (req, res) => {
  try {
    const result = await collegeCourseService.deleteCollegeCourse(
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

module.exports = {
  createCollegeCourse,
  getAllCollegeCourses,
  getActiveCollegeCourses,
  getCollegeCourseById,
  getCoursesByCollege,
  getCoursesByType,
  searchCollegeCourses,
  updateCollegeCourse,
  deleteCollegeCourse
};
