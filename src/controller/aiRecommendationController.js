const aiRecommendationService = require("../services/aiRecommendationService");

// =====================================================
// CREATE RECOMMENDATION
// =====================================================

const createRecommendation = async (req, res) => {
  try {
    const {
      studentId,
      assessmentResultId,
      careerRecommendations,
      overallRecommendation,
      studentStrengths,
      recommendedSkills,
      suggestedLearningPath,
      aiGenerated
    } = req.body;

    // -------------------------------------------------
    // Validation
    // -------------------------------------------------

    if (!studentId || !assessmentResultId) {
      return res.status(400).json({
        success: false,
        message: "studentId and assessmentResultId are required"
      });
    }

    if (!careerRecommendations || !Array.isArray(careerRecommendations)) {
      return res.status(400).json({
        success: false,
        message: "careerRecommendations must be an array"
      });
    }

    // -------------------------------------------------
    // Service
    // -------------------------------------------------

    const recommendation = await aiRecommendationService.createRecommendation(
      studentId,
      assessmentResultId,
      careerRecommendations,
      overallRecommendation,
      studentStrengths,
      recommendedSkills,
      suggestedLearningPath,
      aiGenerated
    );

    return res.status(201).json({
      success: true,
      message: "AI recommendation created successfully",
      data: recommendation
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY ID
// =====================================================

const getRecommendationById = async (req, res) => {
  try {
    const recommendation = await aiRecommendationService.getRecommendationById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "AI recommendation fetched successfully",
      data: recommendation
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET STUDENT RECOMMENDATIONS
// =====================================================

const getStudentRecommendations = async (req, res) => {
  try {
    const recommendations =
      await aiRecommendationService.getStudentRecommendations(
        req.params.studentId
      );

    return res.status(200).json({
      success: true,
      message: "Student AI recommendations fetched successfully",
      data: recommendations
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET LATEST
// =====================================================

const getLatestRecommendation = async (req, res) => {
  try {
    const recommendation =
      await aiRecommendationService.getLatestRecommendation(
        req.params.studentId
      );

    return res.status(200).json({
      success: true,
      message: "Latest AI recommendation fetched successfully",
      data: recommendation
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE
// =====================================================

const deleteRecommendation = async (req, res) => {
  try {
    const result = await aiRecommendationService.deleteRecommendation(
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
  createRecommendation,
  getRecommendationById,
  getStudentRecommendations,
  getLatestRecommendation,
  deleteRecommendation
};
