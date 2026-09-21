const EleventhGroup = require("../model/core/eleventhGroupModel");

const getAllEleventhGroups = async () => {
  return await EleventhGroup.find({ isActive: true }).sort({ groupName: 1 });
};

const getEleventhGroupById = async (id) => {
  return await EleventhGroup.findById(id);
};

const createEleventhGroup = async (groupData) => {
  return await EleventhGroup.create(groupData);
};

module.exports = {
  getAllEleventhGroups,
  getEleventhGroupById,
  createEleventhGroup
};
