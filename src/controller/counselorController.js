const counselorService = require("../services/counselorService");

// CREATE
const createCounselor = async (req, res) => {
  try {
    const userId = req.user.id;

    const counselor = await counselorService.createCounselorProfile(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Counselor profile created successfully",
      data: counselor
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET
const getCounselor = async (req, res) => {
  try {
    const userId = req.user.id;

    const counselor = await counselorService.getCounselorProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Counselor profile fetched successfully",
      data: counselor
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateCounselor = async (req, res) => {
  try {
    const userId = req.user.id;

    const counselor = await counselorService.updateCounselorProfile(
      userId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Counselor profile updated successfully",
      data: counselor
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteCounselor = async (req, res) => {
  try {
    const userId = req.user.id;

    await counselorService.deleteCounselorProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Counselor profile deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createCounselor,
  getCounselor,
  updateCounselor,
  deleteCounselor
};
