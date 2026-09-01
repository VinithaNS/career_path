// service/assessmentService.js

const Assessment = require("../model/assessmentModel");
const AssessmentCategory = require("../model/assessmentCategoryModel");

const createAssessment = async (data) => {
  const category = await AssessmentCategory.findById(data.category);

  if (!category) {
    throw new Error("Assessment category not found");
  }

  const assessment = await Assessment.create(data);

  return await Assessment.findById(assessment._id).populate("category");
};

const getAllAssessments = async () => {
  return await Assessment.find().populate("category").sort({
    displayOrder: 1,
    createdAt: -1
  });
};

const getActiveAssessments = async () => {
  return await Assessment.find({
    isActive: true,
    isPublished: true
  })
    .populate("category")
    .sort({
      displayOrder: 1
    });
};

const getAssessmentById = async (id) => {
  const assessment = await Assessment.findById(id).populate("category");

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  return assessment;
};

const updateAssessment = async (id, data) => {
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

  return await Assessment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  }).populate("category");
};

const deleteAssessment = async (id) => {
  const assessment = await Assessment.findById(id);

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  await Assessment.findByIdAndDelete(id);

  return {
    message: "Assessment deleted successfully"
  };
};

const publishAssessment = async (assessmentId) => {
  const assessment = await Assessment.findById(assessmentId);

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  assessment.isPublished = true;
  assessment.isActive = true;

  await assessment.save();

  return await Assessment.findById(assessmentId).populate("category");
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
