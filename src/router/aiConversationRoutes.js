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
// SEND MESSAGE
// =====================================================
router.post("/:id/send", sendMessage);

// =====================================================
// GET STUDENT CONVERSATIONS
// =====================================================
router.get("/student/:studentId", getStudentConversations);

// =====================================================
// GET CONVERSATION BY ID
// =====================================================
router.get("/:id", getConversationById);

// =====================================================
// CLOSE CONVERSATION
// =====================================================
router.put("/:id/close", closeConversation);

module.exports = router;
