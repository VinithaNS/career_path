const careerRoadmapService = require("../services/careerRoadmapService");

// =====================================================
// CREATE CAREER ROADMAP
// =====================================================

const createCareerRoadmap = async (req, res) => {
  try {
    const roadmap = await careerRoadmapService.createCareerRoadmap(req.body);

    return res.status(201).json({
      success: true,
      message: "Career roadmap created successfully",
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
// GET ALL CAREER ROADMAPS
// =====================================================

const getAllCareerRoadmaps = async (req, res) => {
  try {
    const roadmaps = await careerRoadmapService.getAllCareerRoadmaps();

    return res.status(200).json({
      success: true,
      message: "Career roadmaps fetched successfully",
      count: roadmaps.length,
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
// GET CAREER ROADMAP BY ID
// =====================================================

const getCareerRoadmapById = async (req, res) => {
  try {
    const roadmap = await careerRoadmapService.getCareerRoadmapById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Career roadmap fetched successfully",
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
// GET ROADMAP BY CAREER ID
// =====================================================

const getRoadmapByCareer = async (req, res) => {
  try {
    const roadmap = await careerRoadmapService.getRoadmapByCareer(
      req.params.careerId
    );

    return res.status(200).json({
      success: true,
      message: "Career roadmap fetched successfully",
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
// UPDATE CAREER ROADMAP
// =====================================================

const updateCareerRoadmap = async (req, res) => {
  try {
    const roadmap = await careerRoadmapService.updateCareerRoadmap(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Career roadmap updated successfully",
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
// DELETE CAREER ROADMAP
// =====================================================

const deleteCareerRoadmap = async (req, res) => {
  try {
    await careerRoadmapService.deleteCareerRoadmap(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Career roadmap deleted successfully"
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
  createCareerRoadmap,

  getAllCareerRoadmaps,

  getCareerRoadmapById,

  getRoadmapByCareer,

  updateCareerRoadmap,

  deleteCareerRoadmap
};
