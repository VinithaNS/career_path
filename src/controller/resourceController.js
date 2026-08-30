const resourceService = require("../services/resourceService");

// CREATE
const createResource = async (req, res) => {
  try {
    const resource = await resourceService.createResource(req.body);

    return res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: resource
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL
const getAllResources = async (req, res) => {
  try {
    const resources = await resourceService.getAllResources();

    return res.status(200).json({
      success: true,
      message: "Resources fetched successfully",
      data: resources
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ACTIVE
const getActiveResources = async (req, res) => {
  try {
    const resources = await resourceService.getActiveResources();

    return res.status(200).json({
      success: true,
      message: "Active resources fetched successfully",
      data: resources
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET FEATURED
const getFeaturedResources = async (req, res) => {
  try {
    const resources = await resourceService.getFeaturedResources();

    return res.status(200).json({
      success: true,
      message: "Featured resources fetched successfully",
      data: resources
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY ID
const getResourceById = async (req, res) => {
  try {
    const resource = await resourceService.getResourceById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Resource fetched successfully",
      data: resource
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY CATEGORY
const getResourcesByCategory = async (req, res) => {
  try {
    const resources = await resourceService.getResourcesByCategory(
      req.params.categoryId
    );

    return res.status(200).json({
      success: true,
      message: "Resources fetched by category successfully",
      data: resources
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateResource = async (req, res) => {
  try {
    const resource = await resourceService.updateResource(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      data: resource
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteResource = async (req, res) => {
  try {
    const result = await resourceService.deleteResource(req.params.id);

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
  createResource,
  getAllResources,
  getActiveResources,
  getFeaturedResources,
  getResourceById,
  getResourcesByCategory,
  updateResource,
  deleteResource
};
