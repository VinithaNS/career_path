const CareerRoadmap = require("../model/career/careerRoadmapModel");

const getAllRoadmaps = async () => {
  return await CareerRoadmap.find({ isActive: true }).sort({ createdAt: -1 });
};

const getRoadmapById = async (id) => {
  return await CareerRoadmap.findById(id);
};

const getRoadmapByTitle = async (title) => {
  const cleanTitle = title.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const queryRegex = new RegExp(
    cleanTitle.split(" ").slice(0, 2).join(".*"),
    "i"
  );

  let roadmap = await CareerRoadmap.findOne({
    $or: [
      { title: new RegExp(`^${title.trim()}$`, "i") },
      { title: queryRegex }
    ]
  });

  if (!roadmap) {
    roadmap = await CareerRoadmap.findOne({ isActive: true });
  }
  return roadmap;
};

const createRoadmap = async (data) => {
  return await CareerRoadmap.create(data);
};

module.exports = {
  getAllRoadmaps,
  getRoadmapById,
  getRoadmapByTitle,
  createRoadmap
};
