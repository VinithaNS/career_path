const parentStudentService = require("../services/parentStudentService");

// LINK
const linkStudent = async (req, res) => {
  try {
    const { studentId, relationship } = req.body;

    const result = await parentStudentService.linkStudent(
      req.user.id,
      studentId,
      relationship
    );

    return res.status(201).json({
      success: true,
      message: "Student linked successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET CHILDREN
const getMyChildren = async (req, res) => {
  try {
    const children = await parentStudentService.getMyChildren(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Children fetched successfully",
      data: children
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// GET CHILD
const getChildById = async (req, res) => {
  try {
    const result = await parentStudentService.getChildById(
      req.user.id,
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// UNLINK
const unlinkStudent = async (req, res) => {
  try {
    await parentStudentService.unlinkStudent(req.user.id, req.params.studentId);

    return res.status(200).json({
      success: true,
      message: "Student unlinked successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  linkStudent,
  getMyChildren,
  getChildById,
  unlinkStudent
};
