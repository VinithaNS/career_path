const ResourceCategory = require("../model/resourceCategoryModel");

// =====================================================
// CREATE CATEGORY
// =====================================================

const createResourceCategory = async (data) => {
  try {
    const existingCategory = await ResourceCategory.findOne({
      categoryName: data.categoryName
    });

    if (existingCategory) {
      throw new Error("Resource category already exists");
    }

    const category = await ResourceCategory.create(data);

    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL CATEGORIES
// =====================================================

const getAllResourceCategories = async () => {
  try {
    const categories = await ResourceCategory.find().sort({
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

const getActiveResourceCategories = async () => {
  try {
    const categories = await ResourceCategory.find({
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

const getResourceCategoryById = async (id) => {
  try {
    const category = await ResourceCategory.findById(id);

    if (!category) {
      throw new Error("Resource category not found");
    }

    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE CATEGORY
// =====================================================

const updateResourceCategory = async (id, data) => {
  try {
    const category = await ResourceCategory.findById(id);

    if (!category) {
      throw new Error("Resource category not found");
    }

    const updatedCategory = await ResourceCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE CATEGORY
// =====================================================

const deleteResourceCategory = async (id) => {
  try {
    const category = await ResourceCategory.findById(id);

    if (!category) {
      throw new Error("Resource category not found");
    }

    await ResourceCategory.findByIdAndDelete(id);

    return {
      message: "Resource category deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createResourceCategory,
  getAllResourceCategories,
  getActiveResourceCategories,
  getResourceCategoryById,
  updateResourceCategory,
  deleteResourceCategory
};
