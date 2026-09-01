const express = require("express");

const router = express.Router();

const {
  createConversation,
  sendMessage,
  getConversationById,
  getStudentConversations,
  closeConversation
} = require("../controller/aiConversationController");

// =====================================================
// CREATE CONVERSATION
// =====================================================

router.post("/create", createConversation);

// =====================================================
// GET STUDENT CONVERSATIONS
// =====================================================

router.get("/student/:studentId", getStudentConversations);

// =====================================================
// SEND MESSAGE
// =====================================================

router.post("/:id/message", sendMessage);

// =====================================================
// CLOSE CONVERSATION
// =====================================================

router.patch("/:id/close", closeConversation);

// =====================================================
// GET CONVERSATION
// =====================================================

router.get("/:id", getConversationById);

module.exports = router;
