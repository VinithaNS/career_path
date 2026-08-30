const skillService = require("../services/skillService");

// =====================================================
// CREATE
// =====================================================

const createSkill = async (req, res) => {
  try {
    const skill = await skillService.createSkill(req.body);

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill
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

const getAllSkills = async (req, res) => {
  try {
    const skills = await skillService.getAllSkills();

    return res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      data: skills
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

const getActiveSkills = async (req, res) => {
  try {
    const skills = await skillService.getActiveSkills();

    return res.status(200).json({
      success: true,
      message: "Active skills fetched successfully",
      data: skills
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

const getSkillById = async (req, res) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Skill fetched successfully",
      data: skill
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

const getSkillsByCategory = async (req, res) => {
  try {
    const skills = await skillService.getSkillsByCategory(
      req.params.categoryId
    );

    return res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      data: skills
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEARCH
// =====================================================

const searchSkills = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const skills = await skillService.searchSkills(search);

    return res.status(200).json({
      success: true,
      message: "Skill search completed successfully",
      data: skills
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE
// =====================================================

const updateSkill = async (req, res) => {
  try {
    const skill = await skillService.updateSkill(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill
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

const deleteSkill = async (req, res) => {
  try {
    const result = await skillService.deleteSkill(req.params.id);

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
  createSkill,
  getAllSkills,
  getActiveSkills,
  getSkillById,
  getSkillsByCategory,
  searchSkills,
  updateSkill,
  deleteSkill
};
