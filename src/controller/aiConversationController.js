const aiConversationService = require("../services/aiConversationService");

const createConversation = async (req, res) => {
  try {
    const { studentId, recommendationId, topic } = req.body;
    const conversation = await aiConversationService.createConversation(
      studentId,
      recommendationId,
      topic
    );
    return res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { studentId, message } = req.body;

    if (!conversationId || !message) {
      return res.status(400).json({
        success: false,
        message: "conversationId and message are required"
      });
    }

    const updated = await aiConversationService.sendMessage(
      conversationId,
      studentId,
      message
    );
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getConversationById = async (req, res) => {
  try {
    const conversation = await aiConversationService.getConversationById(
      req.params.conversationId
    );
    return res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const getStudentConversations = async (req, res) => {
  try {
    const list = await aiConversationService.getStudentConversations(
      req.params.studentId
    );
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createConversation,
  sendMessage,
  getConversationById,
  getStudentConversations
};
