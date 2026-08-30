const ExamEligibility = require("../model/examEligibilityModel");

// =====================================================
// CREATE EXAM ELIGIBILITY
// =====================================================

const createExamEligibility = async (data) => {
  try {
    const eligibility = await ExamEligibility.create(data);

    return eligibility;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL EXAM ELIGIBILITIES
// =====================================================

const getAllExamEligibilities = async () => {
  try {
    const eligibilities = await ExamEligibility.find()
      .populate("governmentExam")
      .populate("requiredSkills");

    return eligibilities;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE EXAM ELIGIBILITIES
// =====================================================

const getActiveExamEligibilities = async () => {
  try {
    const eligibilities = await ExamEligibility.find({
      isActive: true
    })
      .populate("governmentExam")
      .populate("requiredSkills");

    return eligibilities;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ELIGIBILITY BY ID
// =====================================================

const getExamEligibilityById = async (id) => {
  try {
    const eligibility = await ExamEligibility.findById(id)
      .populate("governmentExam")
      .populate("requiredSkills");

    if (!eligibility) {
      throw new Error("Exam eligibility not found");
    }

    return eligibility;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ELIGIBILITY BY GOVERNMENT EXAM
// =====================================================

const getEligibilityByExam = async (examId) => {
  try {
    const eligibilities = await ExamEligibility.find({
      governmentExam: examId,
      isActive: true
    })
      .populate("governmentExam")
      .populate("requiredSkills");

    return eligibilities;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE EXAM ELIGIBILITY
// =====================================================

const updateExamEligibility = async (id, data) => {
  try {
    const existingEligibility = await ExamEligibility.findById(id);

    if (!existingEligibility) {
      throw new Error("Exam eligibility not found");
    }

    const updatedEligibility = await ExamEligibility.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("governmentExam")
      .populate("requiredSkills");

    return updatedEligibility;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE EXAM ELIGIBILITY
// =====================================================

const deleteExamEligibility = async (id) => {
  try {
    const eligibility = await ExamEligibility.findById(id);

    if (!eligibility) {
      throw new Error("Exam eligibility not found");
    }

    await ExamEligibility.findByIdAndDelete(id);

    return {
      message: "Exam eligibility deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createExamEligibility,
  getAllExamEligibilities,
  getActiveExamEligibilities,
  getExamEligibilityById,
  getEligibilityByExam,
  updateExamEligibility,
  deleteExamEligibility
};
