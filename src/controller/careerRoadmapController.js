const careerRoadmapService = require("../services/careerRoadmapService");

const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await careerRoadmapService.getAllRoadmaps();
    return res
      .status(200)
      .json({ success: true, count: roadmaps.length, data: roadmaps });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await careerRoadmapService.getRoadmapById(req.params.id);
    if (!roadmap) {
      return res
        .status(404)
        .json({ success: false, message: "Career roadmap not found" });
    }
    return res.status(200).json({ success: true, data: roadmap });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getRoadmapByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title query is required" });
    }
    const roadmap = await careerRoadmapService.getRoadmapByTitle(title);
    return res.status(200).json({ success: true, data: roadmap });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createRoadmap = async (req, res) => {
  try {
    const roadmap = await careerRoadmapService.createRoadmap(req.body);
    return res.status(201).json({ success: true, data: roadmap });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllRoadmaps,
  getRoadmapById,
  getRoadmapByTitle,
  createRoadmap
};
