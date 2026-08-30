const resourceCategoryService = require("../services/resourceCategoryService");

// CREATE
const createResourceCategory = async (req, res) => {
  try {
    const category = await resourceCategoryService.createResourceCategory(
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Resource category created successfully",
      data: category
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL
const getAllResourceCategories = async (req, res) => {
  try {
    const categories = await resourceCategoryService.getAllResourceCategories();

    return res.status(200).json({
      success: true,
      message: "Resource categories fetched successfully",
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ACTIVE
const getActiveResourceCategories = async (req, res) => {
  try {
    const categories =
      await resourceCategoryService.getActiveResourceCategories();

    return res.status(200).json({
      success: true,
      message: "Active resource categories fetched successfully",
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY ID
const getResourceCategoryById = async (req, res) => {
  try {
    const category = await resourceCategoryService.getResourceCategoryById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Resource category fetched successfully",
      data: category
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateResourceCategory = async (req, res) => {
  try {
    const category = await resourceCategoryService.updateResourceCategory(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Resource category updated successfully",
      data: category
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteResourceCategory = async (req, res) => {
  try {
    const result = await resourceCategoryService.deleteResourceCategory(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
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
