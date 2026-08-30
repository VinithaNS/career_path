const collegeReviewService = require("../services/collegeReviewService");

// =====================================================
// CREATE REVIEW
// =====================================================

const createCollegeReview = async (req, res) => {
  try {
    const review = await collegeReviewService.createCollegeReview(req.body);

    return res.status(201).json({
      success: true,
      message: "College review created successfully",
      data: review
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL REVIEWS
// =====================================================

const getAllCollegeReviews = async (req, res) => {
  try {
    const reviews = await collegeReviewService.getAllCollegeReviews();

    return res.status(200).json({
      success: true,
      message: "College reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE REVIEWS
// =====================================================

const getActiveCollegeReviews = async (req, res) => {
  try {
    const reviews = await collegeReviewService.getActiveCollegeReviews();

    return res.status(200).json({
      success: true,
      message: "Active college reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET REVIEW BY ID
// =====================================================

const getCollegeReviewById = async (req, res) => {
  try {
    const review = await collegeReviewService.getCollegeReviewById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "College review fetched successfully",
      data: review
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET REVIEWS BY COLLEGE
// =====================================================

const getReviewsByCollege = async (req, res) => {
  try {
    const reviews = await collegeReviewService.getReviewsByCollege(
      req.params.collegeId
    );

    return res.status(200).json({
      success: true,
      message: "College reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET REVIEWS BY COURSE
// =====================================================

const getReviewsByCourse = async (req, res) => {
  try {
    const reviews = await collegeReviewService.getReviewsByCourse(
      req.params.courseId
    );

    return res.status(200).json({
      success: true,
      message: "Course reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE REVIEW
// =====================================================

const updateCollegeReview = async (req, res) => {
  try {
    const review = await collegeReviewService.updateCollegeReview(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "College review updated successfully",
      data: review
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE REVIEW
// =====================================================

const deleteCollegeReview = async (req, res) => {
  try {
    const result = await collegeReviewService.deleteCollegeReview(
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
  createCollegeReview,
  getAllCollegeReviews,
  getActiveCollegeReviews,
  getCollegeReviewById,
  getReviewsByCollege,
  getReviewsByCourse,
  updateCollegeReview,
  deleteCollegeReview
};
