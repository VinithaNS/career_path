const AIConversation = require("../model/aiConversationModel");

const Student = require("../model/studentModel");

const AIRecommendation = require("../model/aiRecommendationModel");

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

    // Check ownership
    if (conversation.student.toString() !== studentId.toString()) {
      throw new Error("You are not authorized to access this conversation");
    }

    if (!conversation.isActive) {
      throw new Error("Conversation is inactive");
    }

    if (!message || !message.trim()) {
      throw new Error("Message is required");
    }

    // -------------------------------------------------
    // Add User Message
    // -------------------------------------------------

    conversation.messages.push({
      role: "user",
      message: message.trim(),
      timestamp: new Date()
    });

    // -------------------------------------------------
    // Temporary AI Response
    // -------------------------------------------------
    // Actual AI integration can be added here later.
    // -------------------------------------------------

    const aiResponse = generateCareerResponse(message);

    conversation.messages.push({
      role: "assistant",
      message: aiResponse,
      timestamp: new Date()
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
// SIMPLE AI RESPONSE
// =====================================================

const generateCareerResponse = (message) => {
  const text = message.toLowerCase();

  if (text.includes("career")) {
    return "Based on your assessment and interests, you should explore careers that match your strengths and skills. Your assessment result can be used to identify the most suitable career paths.";
  }

  if (text.includes("skill")) {
    return "You should focus on technical skills, communication, problem solving and practical project experience related to your selected career.";
  }

  if (text.includes("developer") || text.includes("programming")) {
    return "If you are interested in programming, Software Development, Web Development and Application Development can be suitable career paths.";
  }

  if (text.includes("data")) {
    return "If you enjoy mathematics, analysis and working with information, Data Analyst and Data-related careers may be suitable options.";
  }

  return "I can help you with career selection, required skills, learning paths, courses and career opportunities. Please ask a specific career-related question.";
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
