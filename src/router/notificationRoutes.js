const express = require("express");

const router = express.Router();

const {
  createNotification,
  getAllNotifications,
  getNotificationsByStudent,
  getUnreadNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require("../controller/notificationController");

// =====================================================
// CREATE
// =====================================================

router.post("/create", createNotification);

// =====================================================
// GET ALL
// =====================================================

router.get("/all", getAllNotifications);

// =====================================================
// GET STUDENT NOTIFICATIONS
// =====================================================

router.get("/student/:studentId", getNotificationsByStudent);

// =====================================================
// GET UNREAD
// =====================================================

router.get("/unread/:studentId", getUnreadNotifications);

// =====================================================
// MARK ALL AS READ
// =====================================================

router.patch("/read-all/:studentId", markAllAsRead);

// =====================================================
// MARK ONE AS READ
// =====================================================

router.patch("/read/:id", markAsRead);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getNotificationById);

// =====================================================
// DELETE
// =====================================================

router.delete("/delete/:id", deleteNotification);

module.exports = router;
