const skillRoadmapService = require("../services/skillRoadmapService");

// =====================================================
// CREATE
// =====================================================

const createSkillRoadmap = async (req, res) => {
  try {
    const roadmap = await skillRoadmapService.createSkillRoadmap(req.body);

    return res.status(201).json({
      success: true,
      message: "Skill roadmap created successfully",
      data: roadmap
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

const getAllSkillRoadmaps = async (req, res) => {
  try {
    const roadmaps = await skillRoadmapService.getAllSkillRoadmaps();

    return res.status(200).json({
      success: true,
      message: "Skill roadmaps fetched successfully",
      data: roadmaps
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

const getActiveSkillRoadmaps = async (req, res) => {
  try {
    const roadmaps = await skillRoadmapService.getActiveSkillRoadmaps();

    return res.status(200).json({
      success: true,
      message: "Active skill roadmaps fetched successfully",
      data: roadmaps
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

const getSkillRoadmapById = async (req, res) => {
  try {
    const roadmap = await skillRoadmapService.getSkillRoadmapById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Skill roadmap fetched successfully",
      data: roadmap
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY SKILL
// =====================================================

const getRoadmapsBySkill = async (req, res) => {
  try {
    const roadmaps = await skillRoadmapService.getRoadmapsBySkill(
      req.params.skillId
    );

    return res.status(200).json({
      success: true,
      message: "Skill roadmaps fetched successfully",
      data: roadmaps
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

const searchSkillRoadmaps = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const roadmaps = await skillRoadmapService.searchSkillRoadmaps(search);

    return res.status(200).json({
      success: true,
      message: "Skill roadmap search completed successfully",
      data: roadmaps
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

const updateSkillRoadmap = async (req, res) => {
  try {
    const roadmap = await skillRoadmapService.updateSkillRoadmap(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Skill roadmap updated successfully",
      data: roadmap
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

const deleteSkillRoadmap = async (req, res) => {
  try {
    const result = await skillRoadmapService.deleteSkillRoadmap(req.params.id);

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
  createSkillRoadmap,
  getAllSkillRoadmaps,
  getActiveSkillRoadmaps,
  getSkillRoadmapById,
  getRoadmapsBySkill,
  searchSkillRoadmaps,
  updateSkillRoadmap,
  deleteSkillRoadmap
};
