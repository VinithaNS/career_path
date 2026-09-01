const aiSupportService = require("../services/aiSupportService");

// =====================================================
// CREATE SUPPORT
// =====================================================

const createSupport = async (req, res) => {
  try {
    const { studentId, conversationId, category, subject, message, priority } =
      req.body;

    if (!studentId || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "studentId, subject and message are required"
      });
    }

    const support = await aiSupportService.createSupport(
      studentId,
      conversationId,
      category,
      subject,
      message,
      priority
    );

    return res.status(201).json({
      success: true,
      message: "AI support request created successfully",
      data: support
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET SUPPORT BY ID
// =====================================================

const getSupportById = async (req, res) => {
  try {
    const support = await aiSupportService.getSupportById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "AI support request fetched successfully",
      data: support
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET STUDENT SUPPORTS
// =====================================================

const getStudentSupports = async (req, res) => {
  try {
    const supports = await aiSupportService.getStudentSupports(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student support requests fetched successfully",
      data: supports
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE STATUS
// =====================================================

const updateSupportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "status is required"
      });
    }

    const support = await aiSupportService.updateSupportStatus(
      req.params.id,
      status
    );

    return res.status(200).json({
      success: true,
      message: "Support status updated successfully",
      data: support
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE SUPPORT
// =====================================================

const deleteSupport = async (req, res) => {
  try {
    const result = await aiSupportService.deleteSupport(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSupport,
  getSupportById,
  getStudentSupports,
  updateSupportStatus,
  deleteSupport
};
