const Skill = require("../model/skillModel");

// =====================================================
// CREATE SKILL
// =====================================================

const createSkill = async (data) => {
  try {
    const { skillName, skillCode } = data;

    const existingSkill = await Skill.findOne({
      skillCode: skillCode.toUpperCase()
    });

    if (existingSkill) {
      throw new Error("Skill code already exists");
    }

    const skill = await Skill.create({
      ...data,
      skillCode: skillCode.toUpperCase()
    });

    return skill;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL SKILLS
// =====================================================

const getAllSkills = async () => {
  try {
    const skills = await Skill.find().populate("categoryId", "name");
    //   .populate("relatedCareers")
    //   .populate("certifications")
    //   .populate("resources")
    //   .populate("projects")
    //   .sort({ displayOrder: 1 });

    return skills;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE SKILLS
// =====================================================

const getActiveSkills = async () => {
  try {
    const skills = await Skill.find({
      isActive: true
    }).populate("categoryId", "name");
    //   .populate("relatedCareers")
    //   .populate("certifications")
    //   .populate("resources")
    //   .populate("projects")
    //   .sort({ displayOrder: 1 });

    return skills;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET SKILL BY ID
// =====================================================

const getSkillById = async (id) => {
  try {
    const skill = await Skill.findById(id).populate("categoryId", "name");
    //   .populate("relatedCareers")
    //   .populate("certifications")
    //   .populate("resources")
    //   .populate("projects");

    if (!skill) {
      throw new Error("Skill not found");
    }

    return skill;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET SKILLS BY CATEGORY
// =====================================================

const getSkillsByCategory = async (categoryId) => {
  try {
    const skills = await Skill.find({
      categoryId,
      isActive: true
    }).populate("categoryId", "name");
    //   .populate("relatedCareers")
    //   .sort({ displayOrder: 1 });

    return skills;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH SKILLS
// =====================================================

const searchSkills = async (search) => {
  try {
    const skills = await Skill.find({
      isActive: true,
      $or: [
        {
          skillName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          skillCode: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    })
      .populate("categoryId", "name")
      .populate("relatedCareers")
      .sort({ displayOrder: 1 });

    return skills;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE SKILL
// =====================================================

const updateSkill = async (id, data) => {
  try {
    const existingSkill = await Skill.findById(id);

    if (!existingSkill) {
      throw new Error("Skill not found");
    }

    if (data.skillCode) {
      const duplicateSkill = await Skill.findOne({
        skillCode: data.skillCode.toUpperCase(),
        _id: { $ne: id }
      });

      if (duplicateSkill) {
        throw new Error("Skill code already exists");
      }

      data.skillCode = data.skillCode.toUpperCase();
    }

    const updatedSkill = await Skill.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("categoryId", "name");
    //   .populate("relatedCareers")
    //   .populate("certifications")
    //   .populate("resources")
    //   .populate("projects");

    return updatedSkill;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE SKILL
// =====================================================

const deleteSkill = async (id) => {
  try {
    const skill = await Skill.findById(id);

    if (!skill) {
      throw new Error("Skill not found");
    }

    await Skill.findByIdAndDelete(id);

    return {
      message: "Skill deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
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
