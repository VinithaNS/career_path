const SkillRoadmap = require("../model/skillRoadmapModel");

// =====================================================
// CREATE SKILL ROADMAP
// =====================================================

const createSkillRoadmap = async (data) => {
  try {
    const roadmap = await SkillRoadmap.create(data);

    return roadmap;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL ROADMAPS
// =====================================================

const getAllSkillRoadmaps = async () => {
  try {
    const roadmaps = await SkillRoadmap.find().populate(
      "skillId",
      "skillName skillCode"
    );
    //   .populate("projects")
    //   .populate("resources")
    //   .populate("certifications")
    //   .populate("relatedCareers")
    //   .sort({ displayOrder: 1 });

    return roadmaps;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE ROADMAPS
// =====================================================

const getActiveSkillRoadmaps = async () => {
  try {
    const roadmaps = await SkillRoadmap.find({
      isActive: true
    }).populate("skillId", "skillName skillCode");
    //   .populate("projects")
    //   .populate("resources")
    //   .populate("certifications")
    //   .populate("relatedCareers")
    //   .sort({ displayOrder: 1 });

    return roadmaps;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ROADMAP BY ID
// =====================================================

const getSkillRoadmapById = async (id) => {
  try {
    const roadmap = await SkillRoadmap.findById(id).populate(
      "skillId",
      "skillName skillCode"
    );
    //   .populate("projects")
    //   .populate("resources")
    //   .populate("certifications")
    //   .populate("relatedCareers");

    if (!roadmap) {
      throw new Error("Skill roadmap not found");
    }

    return roadmap;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ROADMAP BY SKILL
// =====================================================

const getRoadmapsBySkill = async (skillId) => {
  try {
    const roadmaps = await SkillRoadmap.find({
      skillId,
      isActive: true
    }).populate("skillId", "skillName skillCode");
    //   .populate("projects")
    //   .populate("resources")
    //   .populate("certifications")
    //   .populate("relatedCareers")
    //   .sort({ displayOrder: 1 });

    return roadmaps;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH ROADMAP
// =====================================================

const searchSkillRoadmaps = async (search) => {
  try {
    const roadmaps = await SkillRoadmap.find({
      isActive: true,
      $or: [
        {
          roadmapTitle: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        },
        {
          level: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    }).populate("skillId", "skillName skillCode");
    //   .populate("relatedCareers")
    //   .sort({ displayOrder: 1 });

    return roadmaps;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE ROADMAP
// =====================================================

const updateSkillRoadmap = async (id, data) => {
  try {
    const existingRoadmap = await SkillRoadmap.findById(id);

    if (!existingRoadmap) {
      throw new Error("Skill roadmap not found");
    }

    const updatedRoadmap = await SkillRoadmap.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("skillId", "skillName skillCode");
    //   .populate("projects")
    //   .populate("resources")
    //   .populate("certifications")
    //   .populate("relatedCareers");

    return updatedRoadmap;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE ROADMAP
// =====================================================

const deleteSkillRoadmap = async (id) => {
  try {
    const roadmap = await SkillRoadmap.findById(id);

    if (!roadmap) {
      throw new Error("Skill roadmap not found");
    }

    await SkillRoadmap.findByIdAndDelete(id);

    return {
      message: "Skill roadmap deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
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
