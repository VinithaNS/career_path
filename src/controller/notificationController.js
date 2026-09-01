const notificationService = require("../services/notificationService");

// =====================================================
// CREATE
// =====================================================

const createNotification = async (req, res) => {
  try {
    const result = await notificationService.createNotification(req.body);

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL
// =====================================================

const getAllNotifications = async (req, res) => {
  try {
    const result = await notificationService.getAllNotifications();

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      count: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY STUDENT
// =====================================================

const getNotificationsByStudent = async (req, res) => {
  try {
    const result = await notificationService.getNotificationsByStudent(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Student notifications fetched successfully",
      count: result.length,
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET UNREAD
// =====================================================

const getUnreadNotifications = async (req, res) => {
  try {
    const result = await notificationService.getUnreadNotifications(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "Unread notifications fetched successfully",
      count: result.length,
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY ID
// =====================================================

const getNotificationById = async (req, res) => {
  try {
    const result = await notificationService.getNotificationById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Notification fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// MARK AS READ
// =====================================================

const markAsRead = async (req, res) => {
  try {
    const result = await notificationService.markAsRead(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// MARK ALL AS READ
// =====================================================

const markAllAsRead = async (req, res) => {
  try {
    const result = await notificationService.markAllAsRead(
      req.params.studentId
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE
// =====================================================

const deleteNotification = async (req, res) => {
  try {
    const result = await notificationService.deleteNotification(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationsByStudent,
  getUnreadNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification
};
