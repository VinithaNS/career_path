const express = require("express");
const router = express.Router();
const {
  createConversation,
  sendMessage,
  getConversationById,
  getStudentConversations
} = require("../controller/aiConversationController");

router.post("/create", createConversation);
router.post("/:conversationId/message", sendMessage);
router.get("/student/:studentId", getStudentConversations);
router.get("/:conversationId", getConversationById);

module.exports = router;
