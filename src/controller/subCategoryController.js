const subCategoryService = require("../services/subCategoryService");

// CREATE

const createSubCategory = async (req, res) => {
  try {
    const subCategory = await subCategoryService.createSubCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: subCategory
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await subCategoryService.getAllSubCategories();

    return res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY CATEGORY

const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories =
      await subCategoryService.getSubCategoriesByCategory(categoryId);

    return res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// GET ONE

const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await subCategoryService.getSubCategoryById(id);

    return res.status(200).json({
      success: true,
      data: subCategory
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE

const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await subCategoryService.updateSubCategory(
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "SubCategory updated successfully",
      data: subCategory
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await subCategoryService.deleteSubCategory(id);

    return res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory
};
