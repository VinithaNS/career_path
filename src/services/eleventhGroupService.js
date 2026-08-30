const EleventhGroup = require("../model/eleventhGroupModel");

// =====================================================
// CREATE ELEVENTH GROUP
// =====================================================

const createEleventhGroup = async (data) => {
  try {
    const {
      categoryId,
      groupName,
      groupCode,
      description,
      subjects,
      eligibility,
      careerOptions,
      courseOptions,
      imageUrl,
      displayOrder,
      isActive
    } = data;

    // Check duplicate group code
    const existingGroup = await EleventhGroup.findOne({
      groupCode: groupCode.toUpperCase()
    });

    if (existingGroup) {
      throw new Error("Group code already exists");
    }

    const group = await EleventhGroup.create({
      categoryId,
      groupName,
      groupCode: groupCode.toUpperCase(),
      description,
      subjects,
      eligibility,
      careerOptions,
      courseOptions,
      imageUrl,
      displayOrder,
      isActive
    });

    return group;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL ELEVENTH GROUPS
// =====================================================

const getAllEleventhGroups = async () => {
  try {
    const groups = await EleventhGroup.find()
      .populate("categoryId", "name")
      .sort({ displayOrder: 1 });

    return groups;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE ELEVENTH GROUPS
// =====================================================

const getActiveEleventhGroups = async () => {
  try {
    const groups = await EleventhGroup.find({
      isActive: true
    })
      .populate("categoryId", "name")
      .sort({ displayOrder: 1 });

    return groups;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ELEVENTH GROUP BY ID
// =====================================================

const getEleventhGroupById = async (id) => {
  try {
    const group = await EleventhGroup.findById(id).populate(
      "categoryId",
      "name"
    );

    if (!group) {
      throw new Error("Eleventh group not found");
    }

    return group;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET GROUPS BY CATEGORY
// =====================================================

const getGroupsByCategory = async (categoryId) => {
  try {
    const groups = await EleventhGroup.find({
      categoryId,
      isActive: true
    })
      .populate("categoryId", "name")
      .sort({ displayOrder: 1 });

    return groups;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE ELEVENTH GROUP
// =====================================================

const updateEleventhGroup = async (id, data) => {
  try {
    const existingGroup = await EleventhGroup.findById(id);

    if (!existingGroup) {
      throw new Error("Eleventh group not found");
    }

    // Check duplicate group code
    if (data.groupCode) {
      const duplicate = await EleventhGroup.findOne({
        groupCode: data.groupCode.toUpperCase(),
        _id: { $ne: id }
      });

      if (duplicate) {
        throw new Error("Group code already exists");
      }

      data.groupCode = data.groupCode.toUpperCase();
    }

    const updatedGroup = await EleventhGroup.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("categoryId", "name");

    return updatedGroup;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE ELEVENTH GROUP
// =====================================================

const deleteEleventhGroup = async (id) => {
  try {
    const group = await EleventhGroup.findById(id);

    if (!group) {
      throw new Error("Eleventh group not found");
    }

    await EleventhGroup.findByIdAndDelete(id);

    return {
      message: "Eleventh group deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
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
