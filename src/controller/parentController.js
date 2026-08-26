const parentService = require("../services/parentService");

// CREATE
const createParent = async (req, res) => {
  try {
    const parent = await parentService.createParent(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      message: "Parent profile created successfully",
      data: parent
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET MY PROFILE
const getMyProfile = async (req, res) => {
  try {
    const parent = await parentService.getMyParentProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Parent profile fetched successfully",
      data: parent
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateParent = async (req, res) => {
  try {
    const parent = await parentService.updateParent(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Parent profile updated successfully",
      data: parent
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteParent = async (req, res) => {
  try {
    await parentService.deleteParent(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Parent profile deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createParent,
  getMyProfile,
  updateParent,
  deleteParent
};
