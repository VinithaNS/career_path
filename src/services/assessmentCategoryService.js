const AssessmentCategory = require("../model/assessmentCategoryModel");

// =====================================================
// CREATE CATEGORY
// =====================================================

const createAssessmentCategory = async (data) => {
  try {
    const existingCategory = await AssessmentCategory.findOne({
      categoryName: data.categoryName
    });

    if (existingCategory) {
      throw new Error("Assessment category already exists");
    }

    const category = await AssessmentCategory.create(data);

    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL CATEGORIES
// =====================================================

const getAllAssessmentCategories = async () => {
  try {
    const categories = await AssessmentCategory.find().sort({
      displayOrder: 1,
      createdAt: -1
    });

    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE CATEGORIES
// =====================================================

const getActiveAssessmentCategories = async () => {
  try {
    const categories = await AssessmentCategory.find({
      isActive: true
    }).sort({
      displayOrder: 1
    });

    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET CATEGORY BY ID
// =====================================================

const getAssessmentCategoryById = async (id) => {
  try {
    const category = await AssessmentCategory.findById(id);

    if (!category) {
      throw new Error("Assessment category not found");
    }

    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE CATEGORY
// =====================================================

const updateAssessmentCategory = async (id, data) => {
  try {
    const category = await AssessmentCategory.findById(id);

    if (!category) {
      throw new Error("Assessment category not found");
    }

    const updatedCategory = await AssessmentCategory.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );

    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE CATEGORY
// =====================================================

const deleteAssessmentCategory = async (id) => {
  try {
    const category = await AssessmentCategory.findById(id);

    if (!category) {
      throw new Error("Assessment category not found");
    }

    await AssessmentCategory.findByIdAndDelete(id);

    return {
      message: "Assessment category deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAssessmentCategory,
  getAllAssessmentCategories,
  getActiveAssessmentCategories,
  getAssessmentCategoryById,
  updateAssessmentCategory,
  deleteAssessmentCategory
};
