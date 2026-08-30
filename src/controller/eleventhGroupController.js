const eleventhGroupService = require("../services/eleventhGroupService");

// =====================================================
// CREATE
// =====================================================

const createEleventhGroup = async (req, res) => {
  try {
    const group = await eleventhGroupService.createEleventhGroup(req.body);

    return res.status(201).json({
      success: true,

      message: "Eleventh group created successfully",

      data: group
    });
  } catch (error) {
    return res.status(400).json({
      success: false,

      message: error.message
    });
  }
};

// =====================================================
// GET ALL
// =====================================================

const getAllEleventhGroups = async (req, res) => {
  try {
    const groups = await eleventhGroupService.getAllEleventhGroups();

    return res.status(200).json({
      success: true,

      message: "Eleventh groups fetched successfully",

      data: groups
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE
// =====================================================

const getActiveEleventhGroups = async (req, res) => {
  try {
    const groups = await eleventhGroupService.getActiveEleventhGroups();

    return res.status(200).json({
      success: true,

      message: "Active eleventh groups fetched successfully",

      data: groups
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message
    });
  }
};

// =====================================================
// GET BY ID
// =====================================================

const getEleventhGroupById = async (req, res) => {
  try {
    const group = await eleventhGroupService.getEleventhGroupById(
      req.params.id
    );

    return res.status(200).json({
      success: true,

      message: "Eleventh group fetched successfully",

      data: group
    });
  } catch (error) {
    return res.status(404).json({
      success: false,

      message: error.message
    });
  }
};

// =====================================================
// GET BY CATEGORY
// =====================================================

const getGroupsByCategory = async (req, res) => {
  try {
    const groups = await eleventhGroupService.getGroupsByCategory(
      req.params.categoryId
    );

    return res.status(200).json({
      success: true,

      message: "Groups fetched successfully",

      data: groups
    });
  } catch (error) {
    return res.status(404).json({
      success: false,

      message: error.message
    });
  }
};

// =====================================================
// UPDATE
// =====================================================

const updateEleventhGroup = async (req, res) => {
  try {
    const group = await eleventhGroupService.updateEleventhGroup(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,

      message: "Eleventh group updated successfully",

      data: group
    });
  } catch (error) {
    return res.status(400).json({
      success: false,

      message: error.message
    });
  }
};

// =====================================================
// DELETE
// =====================================================

const deleteEleventhGroup = async (req, res) => {
  try {
    const result = await eleventhGroupService.deleteEleventhGroup(
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

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createEleventhGroup,

  getAllEleventhGroups,

  getActiveEleventhGroups,

  getEleventhGroupById,

  getGroupsByCategory,

  updateEleventhGroup,

  deleteEleventhGroup
};
