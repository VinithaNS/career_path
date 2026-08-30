const Resource = require("../model/resourceModel");

const ResourceCategory = require("../model/resourceCategoryModel");

// =====================================================
// CREATE RESOURCE
// =====================================================

const createResource = async (data) => {
  try {
    const category = await ResourceCategory.findById(data.category);

    if (!category) {
      throw new Error("Resource category not found");
    }

    const resource = await Resource.create(data);

    return await Resource.findById(resource._id).populate("category");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL RESOURCES
// =====================================================

const getAllResources = async () => {
  try {
    const resources = await Resource.find().populate("category").sort({
      displayOrder: 1,
      createdAt: -1
    });

    return resources;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE RESOURCES
// =====================================================

const getActiveResources = async () => {
  try {
    const resources = await Resource.find({
      isActive: true
    })
      .populate("category")
      .sort({
        displayOrder: 1,
        createdAt: -1
      });

    return resources;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET FEATURED RESOURCES
// =====================================================

const getFeaturedResources = async () => {
  try {
    const resources = await Resource.find({
      isActive: true,
      isFeatured: true
    })
      .populate("category")
      .sort({
        displayOrder: 1
      });

    return resources;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET RESOURCE BY ID
// =====================================================

const getResourceById = async (id) => {
  try {
    const resource = await Resource.findById(id).populate("category");

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET RESOURCES BY CATEGORY
// =====================================================

const getResourcesByCategory = async (categoryId) => {
  try {
    const category = await ResourceCategory.findById(categoryId);

    if (!category) {
      throw new Error("Resource category not found");
    }

    const resources = await Resource.find({
      category: categoryId,
      isActive: true
    })
      .populate("category")
      .sort({
        displayOrder: 1,
        createdAt: -1
      });

    return resources;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE RESOURCE
// =====================================================

const updateResource = async (id, data) => {
  try {
    const resource = await Resource.findById(id);

    if (!resource) {
      throw new Error("Resource not found");
    }

    if (data.category) {
      const category = await ResourceCategory.findById(data.category);

      if (!category) {
        throw new Error("Resource category not found");
      }
    }

    const updatedResource = await Resource.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("category");

    return updatedResource;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE RESOURCE
// =====================================================

const deleteResource = async (id) => {
  try {
    const resource = await Resource.findById(id);

    if (!resource) {
      throw new Error("Resource not found");
    }

    await Resource.findByIdAndDelete(id);

    return {
      message: "Resource deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
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
