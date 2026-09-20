const EleventhGroup = require("../model/core/eleventhGroupModel");

const getActiveEleventhGroups = async () => {
  return await EleventhGroup.find({ isActive: true })
    .populate({
      path: "suitableCollegeDepartments",
      select: "departmentName code slug",
      strictPopulate: false
    })
    .sort({ displayOrder: 1, groupName: 1 });
};

const getAllEleventhGroups = async () => {
  return await EleventhGroup.find()
    .populate({
      path: "suitableCollegeDepartments",
      select: "departmentName code slug",
      strictPopulate: false
    })
    .sort({ displayOrder: 1 });
};

const getEleventhGroupById = async (id) => {
  return await EleventhGroup.findById(id).populate({
    path: "suitableCollegeDepartments",
    strictPopulate: false
  });
};

const createEleventhGroup = async (data) => {
  return await EleventhGroup.create(data);
};

module.exports = {
  getActiveEleventhGroups,
  getAllEleventhGroups,
  getEleventhGroupById,
  createEleventhGroup
};
