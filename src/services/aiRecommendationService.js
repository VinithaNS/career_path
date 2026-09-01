const AIRecommendation = require("../model/aiRecommendationModel");

const AssessmentResult = require("../model/assessmentResultModel");

const Career = require("../model/careerModel");

const Student = require("../model/studentModel");

// =====================================================
// CREATE AI RECOMMENDATION
// =====================================================

const createRecommendation = async (
  studentId,
  assessmentResultId,
  careerRecommendations,
  overallRecommendation,
  studentStrengths,
  recommendedSkills,
  suggestedLearningPath,
  aiGenerated = false
) => {
  try {
    // -------------------------------------------------
    // Check Student
    // -------------------------------------------------

    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    // -------------------------------------------------
    // Check Assessment Result
    // -------------------------------------------------

    const assessmentResult =
      await AssessmentResult.findById(assessmentResultId);

    if (!assessmentResult) {
      throw new Error("Assessment result not found");
    }

    // -------------------------------------------------
    // Make sure result belongs to student
    // -------------------------------------------------

    if (assessmentResult.student.toString() !== studentId.toString()) {
      throw new Error("Assessment result does not belong to this student");
    }

    // -------------------------------------------------
    // Check Existing Recommendation
    // -------------------------------------------------

    const existingRecommendation = await AIRecommendation.findOne({
      student: studentId,
      assessmentResult: assessmentResultId
    });

    if (existingRecommendation) {
      return await AIRecommendation.findById(existingRecommendation._id)
        .populate("student")
        .populate("assessmentResult")
        .populate("recommendedCareers.career");
    }

    // -------------------------------------------------
    // Validate Careers
    // -------------------------------------------------

    if (!Array.isArray(careerRecommendations)) {
      throw new Error("careerRecommendations must be an array");
    }

    // -------------------------------------------------
    // Validate Career IDs
    // -------------------------------------------------

    const formattedCareers = [];

    for (const recommendation of careerRecommendations) {
      const career = await Career.findById(recommendation.career);

      if (!career) {
        throw new Error(`Career not found: ${recommendation.career}`);
      }

      formattedCareers.push({
        career: recommendation.career,

        matchPercentage: recommendation.matchPercentage || 0,

        reason: recommendation.reason || "",

        strengths: recommendation.strengths || [],

        skillsToDevelop: recommendation.skillsToDevelop || []
      });
    }

    // -------------------------------------------------
    // Create Recommendation
    // -------------------------------------------------

    const recommendation = await AIRecommendation.create({
      student: studentId,

      assessmentResult: assessmentResultId,

      recommendedCareers: formattedCareers,

      overallRecommendation: overallRecommendation || "",

      studentStrengths: studentStrengths || [],

      recommendedSkills: recommendedSkills || [],

      suggestedLearningPath: suggestedLearningPath || [],

      aiGenerated,

      status: "Generated"
    });

    return await AIRecommendation.findById(recommendation._id)
      .populate("student")
      .populate("assessmentResult")
      .populate("recommendedCareers.career");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET RECOMMENDATION BY ID
// =====================================================

const getRecommendationById = async (recommendationId) => {
  try {
    const recommendation = await AIRecommendation.findById(recommendationId)
      .populate("student")
      .populate("assessmentResult")
      .populate("recommendedCareers.career");

    if (!recommendation) {
      throw new Error("AI recommendation not found");
    }

    return recommendation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET STUDENT RECOMMENDATIONS
// =====================================================

const getStudentRecommendations = async (studentId) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const recommendations = await AIRecommendation.find({
      student: studentId
    })
      .populate("assessmentResult")
      .populate("recommendedCareers.career")
      .sort({
        createdAt: -1
      });

    return recommendations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET LATEST RECOMMENDATION
// =====================================================

const getLatestRecommendation = async (studentId) => {
  try {
    const recommendation = await AIRecommendation.findOne({
      student: studentId
    })
      .populate("assessmentResult")
      .populate("recommendedCareers.career")
      .sort({
        createdAt: -1
      });

    if (!recommendation) {
      throw new Error("No AI recommendation found for this student");
    }

    return recommendation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE RECOMMENDATION
// =====================================================

const deleteRecommendation = async (recommendationId) => {
  try {
    const recommendation = await AIRecommendation.findById(recommendationId);

    if (!recommendation) {
      throw new Error("AI recommendation not found");
    }

    await AIRecommendation.findByIdAndDelete(recommendationId);

    return {
      message: "AI recommendation deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createRecommendation,
  getRecommendationById,
  getStudentRecommendations,
  getLatestRecommendation,
  deleteRecommendation
};
