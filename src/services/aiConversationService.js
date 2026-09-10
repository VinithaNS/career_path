const AIConversation = require("../model/aiConversationModel");

const Student = require("../model/studentModel");

const AIRecommendation = require("../model/aiRecommendationModel");

const { getAIReply } = require("./geminiService");

// =====================================================
// CREATE CONVERSATION
// =====================================================

const createConversation = async (studentId, recommendationId, topic) => {
  try {
    // Check student
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    // Check recommendation if provided
    if (recommendationId) {
      const recommendation = await AIRecommendation.findById(recommendationId);

      if (!recommendation) {
        throw new Error("AI recommendation not found");
      }

      if (recommendation.student.toString() !== studentId.toString()) {
        throw new Error("Recommendation does not belong to this student");
      }
    }

    const conversation = await AIConversation.create({
      student: studentId,

      recommendation: recommendationId || null,

      topic: topic || "Career Guidance",

      messages: [],

      isActive: true
    });

    return await AIConversation.findById(conversation._id)
      .populate("student")
      .populate("recommendation");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEND MESSAGE
// =====================================================

const sendMessage = async (conversationId, studentId, message) => {
  try {
    const conversation = await AIConversation.findById(conversationId);

    if (!conversation) {
      throw new Error("AI conversation not found");
    }

    if (conversation.student.toString() !== studentId.toString()) {
      throw new Error("You are not authorized to access this conversation");
    }

    if (!conversation.isActive) {
      throw new Error("Conversation is inactive");
    }

    if (!message || !message.trim()) {
      throw new Error("Message is required");
    }

    const trimmedMessage = message.trim();

    // ============================================
    // SEND PREVIOUS HISTORY TO GEMINI
    // ============================================

    const historyForAI = conversation.messages.map((m) => ({
      role: m.role,
      message: m.message
    }));

    let aiResponse;

    try {
      aiResponse = await getAIReply(historyForAI, trimmedMessage);
    } catch (error) {
      console.error("Gemini response error:", error.message);

      aiResponse =
        "I'm having trouble responding right now. Please try again in a moment.";
    }

    // ============================================
    // SAVE USER MESSAGE
    // ============================================

    conversation.messages.push({
      role: "user",
      message: trimmedMessage
    });

    // ============================================
    // SAVE AI MESSAGE
    // ============================================

    conversation.messages.push({
      role: "assistant",
      message: aiResponse
    });

    await conversation.save();

    return await AIConversation.findById(conversationId)
      .populate("student")
      .populate("recommendation");
  } catch (error) {
    throw new Error(error.message);
  }
};
// =====================================================
// GET CONVERSATION BY ID
// =====================================================

const getConversationById = async (conversationId, studentId) => {
  try {
    const conversation = await AIConversation.findById(conversationId)
      .populate("student")
      .populate("recommendation");

    if (!conversation) {
      throw new Error("AI conversation not found");
    }

    if (conversation.student._id.toString() !== studentId.toString()) {
      throw new Error("You are not authorized to access this conversation");
    }

    return conversation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET STUDENT CONVERSATIONS
// =====================================================

const getStudentConversations = async (studentId) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const conversations = await AIConversation.find({
      student: studentId
    })
      .populate("recommendation")
      .sort({
        updatedAt: -1
      });

    return conversations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// CLOSE CONVERSATION
// =====================================================

const closeConversation = async (conversationId, studentId) => {
  try {
    const conversation = await AIConversation.findById(conversationId);

    if (!conversation) {
      throw new Error("AI conversation not found");
    }

    if (conversation.student.toString() !== studentId.toString()) {
      throw new Error("You are not authorized to close this conversation");
    }

    conversation.isActive = false;

    await conversation.save();

    return conversation;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createConversation,
  sendMessage,
  getConversationById,
  getStudentConversations,
  closeConversation
};
