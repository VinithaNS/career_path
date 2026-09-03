const CareerRecommendation = require("../model/careerRecommendationModel.js");

const {
  generateRecommendations
} = require("../services/careerRecommendationService.js");

// GENERATE
exports.generateCareerRecommendations = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required"
      });
    }

    const recommendations = await generateRecommendations(studentId);

    return res.status(200).json({
      success: true,
      message: "Career recommendations generated successfully",
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET STUDENT RECOMMENDATIONS
exports.getStudentRecommendations = async (req, res) => {
  try {
    const data = await CareerRecommendation.find({
      student: req.params.studentId,
      status: "Active"
    })
      .populate("career")
      .populate("matchedSubjects")
      .populate("matchedSkills")
      .sort({
        rank: 1
      });

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE RECOMMENDATION
exports.getRecommendationById = async (req, res) => {
  try {
    const data = await CareerRecommendation.findById(req.params.id)
      .populate("student")
      .populate("career")
      .populate("matchedSubjects")
      .populate("matchedSkills");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Career recommendation not found"
      });
    }

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
exports.deleteRecommendation = async (req, res) => {
  try {
    const data = await CareerRecommendation.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Career recommendation not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career recommendation deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
