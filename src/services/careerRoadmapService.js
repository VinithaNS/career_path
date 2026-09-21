const CareerRoadmap = require("../model/career/careerRoadmapModel");

const getAllRoadmaps = async () => {
  return await CareerRoadmap.find({ isActive: true }).sort({ createdAt: -1 });
};

const getRoadmapById = async (id) => {
  return await CareerRoadmap.findById(id);
};

const getRoadmapByTitle = async (title) => {
  const cleanTitle = title.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const searchRegex = new RegExp(
    cleanTitle.split(" ").slice(0, 2).join(".*"),
    "i"
  );

  let roadmap = await CareerRoadmap.findOne({
    $or: [
      { title: new RegExp(`^${title.trim()}$`, "i") },
      { title: searchRegex }
    ]
  });

  if (!roadmap) {
    roadmap = await CareerRoadmap.findOne({ isActive: true });
  }
  return roadmap;
};

const createRoadmap = async (roadmapData) => {
  return await CareerRoadmap.create(roadmapData);
};

const updateRoadmapStep = async (id, stepId, stepData) => {
  return await CareerRoadmap.findOneAndUpdate(
    { _id: id, "steps._id": stepId },
    {
      $set: {
        "steps.$.title": stepData.title,
        "steps.$.description": stepData.description,
        "steps.$.topics": stepData.topics,
        "steps.$.tools": stepData.tools,
        "steps.$.practicePlatforms": stepData.practicePlatforms,
        "steps.$.miniProject": stepData.miniProject,
        "steps.$.estimatedDuration": stepData.estimatedDuration
      }
    },
    { new: true }
  );
};

module.exports = {
  getAllRoadmaps,
  getRoadmapById,
  getRoadmapByTitle,
  createRoadmap,
  updateRoadmapStep
};
