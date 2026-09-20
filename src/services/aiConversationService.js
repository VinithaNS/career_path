const AIConversation = require("../model/ai/aiConversationModel");
const { getAIReply } = require("./aiService");

const createConversation = async (studentId, recommendationId, topic) => {
  const conversation = await AIConversation.create({
    student: studentId || null,
    topic: topic || "Career Guidance",
    messages: [],
    isActive: true
  });
  return conversation;
};

const sendMessage = async (conversationId, studentId, message) => {
  const conversation = await AIConversation.findById(conversationId);
  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const trimmed = message.trim();
  const historyForAI = conversation.messages.map((m) => ({
    role: m.role,
    message: m.message
  }));

  let aiResponse = "";
  try {
    aiResponse = await getAIReply(historyForAI, trimmed);
  } catch (error) {
    console.error("AI Error:", error.message);
    aiResponse =
      "I'm having trouble responding right now. Please try again in a moment.";
  }

  conversation.messages.push({ role: "user", message: trimmed });
  conversation.messages.push({ role: "assistant", message: aiResponse });
  await conversation.save();

  return conversation;
};

const getConversationById = async (conversationId) => {
  const conversation = await AIConversation.findById(conversationId);
  if (!conversation) {
    throw new Error("Conversation not found");
  }
  return conversation;
};

const getStudentConversations = async (studentId) => {
  return await AIConversation.find({ student: studentId }).sort({
    updatedAt: -1
  });
};

module.exports = {
  createConversation,
  sendMessage,
  getConversationById,
  getStudentConversations
};
