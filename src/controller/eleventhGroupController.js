const eleventhGroupService = require("../services/eleventhGroupService");

const getActiveGroups = async (req, res) => {
  try {
    const groups = await eleventhGroupService.getActiveEleventhGroups();
    return res
      .status(200)
      .json({ success: true, count: groups.length, data: groups });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await eleventhGroupService.getAllEleventhGroups();
    return res
      .status(200)
      .json({ success: true, count: groups.length, data: groups });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getGroupById = async (req, res) => {
  try {
    const group = await eleventhGroupService.getEleventhGroupById(
      req.params.id
    );
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "11th stream not found" });
    }
    return res.status(200).json({ success: true, data: group });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createGroup = async (req, res) => {
  try {
    const group = await eleventhGroupService.createEleventhGroup(req.body);
    return res.status(201).json({ success: true, data: group });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getActiveGroups,
  getAllGroups,
  getGroupById,
  createGroup
};
