const SubCategory = require("../model/subCategoryModel.js");

const Category = require("../model/categoryModel.js");

// CREATE

const createSubCategory = async (data) => {
  const category = await Category.findById(data.categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const existing = await SubCategory.findOne({
    categoryId: data.categoryId,
    name: data.name
  });

  if (existing) {
    throw new Error("SubCategory already exists");
  }

  const subCategory = await SubCategory.create(data);

  return subCategory;
};

// GET ALL

const getAllSubCategories = async () => {
  return await SubCategory.find({
    isActive: true
  })
    .populate("categoryId")
    .sort({
      displayOrder: 1
    });
};

// GET BY CATEGORY

const getSubCategoriesByCategory = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return await SubCategory.find({
    categoryId,
    isActive: true
  }).sort({
    displayOrder: 1
  });
};

// GET ONE

const getSubCategoryById = async (subCategoryId) => {
  const subCategory =
    await SubCategory.findById(subCategoryId).populate("categoryId");

  if (!subCategory) {
    throw new Error("SubCategory not found");
  }

  return subCategory;
};

// UPDATE

const updateSubCategory = async (subCategoryId, data) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    subCategoryId,
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!subCategory) {
    throw new Error("SubCategory not found");
  }

  return subCategory;
};

// DELETE

const deleteSubCategory = async (subCategoryId) => {
  const subCategory = await SubCategory.findByIdAndDelete(subCategoryId);

  if (!subCategory) {
    throw new Error("SubCategory not found");
  }

  return subCategory;
};

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory
};
