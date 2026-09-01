const aiConversationService = require("../services/aiConversationService");

// =====================================================
// CREATE CONVERSATION
// =====================================================

const createConversation = async (req, res) => {
  try {
    const { studentId, recommendationId, topic } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "studentId is required"
      });
    }

    const conversation = await aiConversationService.createConversation(
      studentId,
      recommendationId,
      topic
    );

    return res.status(201).json({
      success: true,
      message: "AI conversation created successfully",
      data: conversation
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEND MESSAGE
// =====================================================

const sendMessage = async (req, res) => {
  try {
    const { studentId, message } = req.body;

    if (!studentId || !message) {
      return res.status(400).json({
        success: false,
        message: "studentId and message are required"
      });
    }

    const conversation = await aiConversationService.sendMessage(
      req.params.id,
      studentId,
      message
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: conversation
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET CONVERSATION
// =====================================================

const getConversationById = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "studentId is required"
      });
    }

    const conversation = await aiConversationService.getConversationById(
      req.params.id,
      studentId
    );

    return res.status(200).json({
      success: true,
      message: "AI conversation fetched successfully",
      data: conversation
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET STUDENT CONVERSATIONS
// =====================================================

const getStudentConversations = async (req, res) => {
  try {
    const conversations = await aiConversationService.getStudentConversations(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student conversations fetched successfully",
      data: conversations
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// CLOSE CONVERSATION
// =====================================================

const closeConversation = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "studentId is required"
      });
    }

    const conversation = await aiConversationService.closeConversation(
      req.params.id,
      studentId
    );

    return res.status(200).json({
      success: true,
      message: "AI conversation closed successfully",
      data: conversation
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createConversation,
  sendMessage,
  getConversationById,
  getStudentConversations,
  closeConversation
};
