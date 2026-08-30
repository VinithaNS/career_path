const Assessment = require("../model/assessmentModel");

const AssessmentCategory = require("../model/assessmentCategoryModel");

// =====================================================
// CREATE ASSESSMENT
// =====================================================

const createAssessment = async (data) => {
  try {
    const category = await AssessmentCategory.findById(data.category);

    if (!category) {
      throw new Error("Assessment category not found");
    }

    const assessment = await Assessment.create(data);

    return await Assessment.findById(assessment._id).populate("category");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL ASSESSMENTS
// =====================================================

const getAllAssessments = async () => {
  try {
    const assessments = await Assessment.find().populate("category").sort({
      displayOrder: 1,
      createdAt: -1
    });

    return assessments;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE ASSESSMENTS
// =====================================================

const getActiveAssessments = async () => {
  try {
    const assessments = await Assessment.find({
      isActive: true,
      isPublished: true
    })
      .populate("category")
      .sort({
        displayOrder: 1
      });

    return assessments;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ASSESSMENT BY ID
// =====================================================

const getAssessmentById = async (id) => {
  try {
    const assessment = await Assessment.findById(id).populate("category");

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    return assessment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE ASSESSMENT
// =====================================================

const updateAssessment = async (id, data) => {
  try {
    const assessment = await Assessment.findById(id);

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    if (data.category) {
      const category = await AssessmentCategory.findById(data.category);

      if (!category) {
        throw new Error("Assessment category not found");
      }
    }

    const updatedAssessment = await Assessment.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("category");

    return updatedAssessment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE ASSESSMENT
// =====================================================

const deleteAssessment = async (id) => {
  try {
    const assessment = await Assessment.findById(id);

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    await Assessment.findByIdAndDelete(id);

    return {
      message: "Assessment deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// PUBLISH ASSESSMENT
// =====================================================

const publishAssessment = async (id) => {
  try {
    const assessment = await Assessment.findById(id);

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    assessment.isPublished = true;

    await assessment.save();

    return assessment;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAssessment,
  getAllAssessments,
  getActiveAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  publishAssessment
};
