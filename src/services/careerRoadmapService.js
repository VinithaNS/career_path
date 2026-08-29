const CareerRoadmap = require("../model/careerRoadmapModel");
const Career = require("../model/careerModel");
// =====================================================
// CREATE CAREER ROADMAP
// =====================================================

const createCareerRoadmap = async (data) => {
  // Check whether Career exists

  const career = await Career.findById(data.careerId);

  if (!career) {
    throw new Error("Career not found");
  }

  // Check duplicate roadmap for same career
  const existingRoadmap = await CareerRoadmap.findOne({
    careerId: data.careerId
  });

  if (existingRoadmap) {
    throw new Error("Career roadmap already exists for this career");
  }

  // Create roadmap
  const roadmap = await CareerRoadmap.create(data);

  return roadmap;
};

// =====================================================
// GET ALL CAREER ROADMAPS
// =====================================================

const getAllCareerRoadmaps = async () => {
  const roadmaps = await CareerRoadmap.find({
    isActive: true
  })
    .populate("careerId")
    .sort({
      createdAt: -1
    });

  return roadmaps;
};

// =====================================================
// GET CAREER ROADMAP BY ID
// =====================================================

const getCareerRoadmapById = async (roadmapId) => {
  const roadmap = await CareerRoadmap.findById(roadmapId).populate("careerId");

  if (!roadmap) {
    throw new Error("Career roadmap not found");
  }

  return roadmap;
};

// =====================================================
// GET ROADMAP BY CAREER
// =====================================================

const getRoadmapByCareer = async (careerId) => {
  const roadmap = await CareerRoadmap.findOne({
    careerId: careerId,
    isActive: true
  }).populate("careerId");

  if (!roadmap) {
    throw new Error("Career roadmap not found for this career");
  }

  return roadmap;
};

// =====================================================
// UPDATE CAREER ROADMAP
// =====================================================

const updateCareerRoadmap = async (roadmapId, data) => {
  const roadmap = await CareerRoadmap.findByIdAndUpdate(
    roadmapId,
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  ).populate("careerId");

  if (!roadmap) {
    throw new Error("Career roadmap not found");
  }

  return roadmap;
};

// =====================================================
// DELETE CAREER ROADMAP
// =====================================================

const deleteCareerRoadmap = async (roadmapId) => {
  const roadmap = await CareerRoadmap.findByIdAndDelete(roadmapId);

  if (!roadmap) {
    throw new Error("Career roadmap not found");
  }

  return roadmap;
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
