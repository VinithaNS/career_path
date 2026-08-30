const degreeCourseService = require("../services/degreeCourseService");

// =====================================================
// CREATE DEGREE COURSE
// =====================================================

const createDegreeCourse = async (req, res) => {
  try {
    const course = await degreeCourseService.createDegreeCourse(req.body);

    return res.status(201).json({
      success: true,
      message: "Degree course created successfully",
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
// GET ALL DEGREE COURSES
// =====================================================

const getAllDegreeCourses = async (req, res) => {
  try {
    const courses = await degreeCourseService.getAllDegreeCourses();

    return res.status(200).json({
      success: true,
      message: "Degree courses fetched successfully",
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
// GET ACTIVE DEGREE COURSES
// =====================================================

const getActiveDegreeCourses = async (req, res) => {
  try {
    const courses = await degreeCourseService.getActiveDegreeCourses();

    return res.status(200).json({
      success: true,
      message: "Active degree courses fetched successfully",
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
// GET DEGREE COURSE BY ID
// =====================================================

const getDegreeCourseById = async (req, res) => {
  try {
    const course = await degreeCourseService.getDegreeCourseById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Degree course fetched successfully",
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
// GET DEGREE COURSES BY CATEGORY
// =====================================================

const getDegreeCoursesByCategory = async (req, res) => {
  try {
    const courses = await degreeCourseService.getDegreeCoursesByCategory(
      req.params.categoryId
    );

    return res.status(200).json({
      success: true,
      message: "Degree courses fetched successfully",
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
// SEARCH DEGREE COURSES
// =====================================================

const searchDegreeCourses = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const courses = await degreeCourseService.searchDegreeCourses(search);

    return res.status(200).json({
      success: true,
      message: "Degree course search completed successfully",
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
// UPDATE DEGREE COURSE
// =====================================================

const updateDegreeCourse = async (req, res) => {
  try {
    const course = await degreeCourseService.updateDegreeCourse(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Degree course updated successfully",
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
// DELETE DEGREE COURSE
// =====================================================

const deleteDegreeCourse = async (req, res) => {
  try {
    const result = await degreeCourseService.deleteDegreeCourse(req.params.id);

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
  createDegreeCourse,
  getAllDegreeCourses,
  getActiveDegreeCourses,
  getDegreeCourseById,
  getDegreeCoursesByCategory,
  searchDegreeCourses,
  updateDegreeCourse,
  deleteDegreeCourse
};
