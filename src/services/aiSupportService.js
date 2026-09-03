const AISupport = require("../model/AISupportModel");

const Student = require("../model/studentModel");

const AIConversation = require("../model/aiConversationModel");

// =====================================================
// CREATE SUPPORT REQUEST
// =====================================================

const createSupport = async (
  studentId,
  conversationId,
  category,
  subject,
  message,
  priority
) => {
  try {
    // Check student
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    // Check conversation
    if (conversationId) {
      const conversation = await AIConversation.findById(conversationId);

      if (!conversation) {
        throw new Error("AI conversation not found");
      }

      if (conversation.student.toString() !== studentId.toString()) {
        throw new Error("Conversation does not belong to this student");
      }
    }

    // Generate basic support response
    const aiResponse = generateSupportResponse(category, message);

    const support = await AISupport.create({
      student: studentId,

      conversation: conversationId || null,

      category: category || "General",

      subject,

      message,

      aiResponse,

      priority: priority || "Medium",

      status: "Open"
    });

    return await AISupport.findById(support._id)
      .populate("student")
      .populate("conversation");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SUPPORT RESPONSE
// =====================================================

const generateSupportResponse = (category, message) => {
  const text = message.toLowerCase();

  if (category === "Assessment Help") {
    return "Please check your assessment answers and result details. If the issue continues, review the assessment attempt associated with your result.";
  }

  if (category === "Career Guidance") {
    return "Your assessment result and interests can be used to identify suitable career options. Review your AI recommendations for detailed career guidance.";
  }

  if (category === "Course Guidance") {
    return "Choose courses based on your selected career, required skills and current knowledge level.";
  }

  if (category === "Skill Guidance") {
    return "Identify the skills required for your target career and follow a structured learning path from beginner to advanced level.";
  }

  if (text.includes("login") || text.includes("password")) {
    return "Please verify your login credentials. If you still cannot access your account, use the password recovery process.";
  }

  return "Thank you for contacting AI Support. Your request has been received and we will provide guidance based on your career profile.";
};

// =====================================================
// GET SUPPORT BY ID
// =====================================================

const getSupportById = async (supportId) => {
  try {
    const support = await AISupport.findById(supportId)
      .populate("student")
      .populate("conversation");

    if (!support) {
      throw new Error("AI support request not found");
    }

    return support;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET STUDENT SUPPORT REQUESTS
// =====================================================

const getStudentSupports = async (studentId) => {
  try {
    const supports = await AISupport.find({
      student: studentId
    })
      .populate("conversation")
      .sort({
        createdAt: -1
      });

    return supports;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE SUPPORT STATUS
// =====================================================

const updateSupportStatus = async (supportId, status) => {
  try {
    const support = await AISupport.findById(supportId);

    if (!support) {
      throw new Error("AI support request not found");
    }

    support.status = status;

    if (status === "Resolved") {
      support.resolvedAt = new Date();
    } else {
      support.resolvedAt = null;
    }

    await support.save();

    return support;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE SUPPORT
// =====================================================

const deleteSupport = async (supportId) => {
  try {
    const support = await AISupport.findById(supportId);

    if (!support) {
      throw new Error("AI support request not found");
    }

    await AISupport.findByIdAndDelete(supportId);

    return {
      message: "AI support request deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createSupport,
  getSupportById,
  getStudentSupports,
  updateSupportStatus,
  deleteSupport
};
