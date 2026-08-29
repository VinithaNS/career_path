const Category = require("../model/categoryModel");

// CREATE CATEGORY

const createCategory = async (data) => {
  const existingCategory = await Category.findOne({
    name: data.name
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await Category.create(data);

  return category;
};

// GET ALL CATEGORIES

const getAllCategories = async () => {
  const categories = await Category.find({
    isActive: true
  }).sort({
    displayOrder: 1,
    createdAt: -1
  });

  return categories;
};

// GET CATEGORY BY ID

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// UPDATE CATEGORY

const updateCategory = async (categoryId, data) => {
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// DELETE CATEGORY

const deleteCategory = async (categoryId) => {
  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
