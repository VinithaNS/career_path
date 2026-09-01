const Notification = require("../model/notificationModel");

const Student = require("../model/studentModel");

// =====================================================
// CREATE NOTIFICATION
// =====================================================

const createNotification = async (data) => {
  try {
    const {
      student,
      title,
      message,
      type,
      referenceId,
      referenceType,
      priority
    } = data;

    // ================================================
    // VALIDATION
    // ================================================

    if (!student) {
      throw new Error("Student is required");
    }

    if (!title) {
      throw new Error("Notification title is required");
    }

    if (!message) {
      throw new Error("Notification message is required");
    }

    if (!type) {
      throw new Error("Notification type is required");
    }

    // ================================================
    // CHECK STUDENT
    // ================================================

    const studentExists = await Student.findById(student);

    if (!studentExists) {
      throw new Error("Student not found");
    }

    // ================================================
    // CREATE
    // ================================================

    const notification = await Notification.create({
      student,
      title,
      message,
      type,
      referenceId: referenceId || null,
      referenceType: referenceType || "None",
      priority: priority || "Medium",
      isRead: false,
      isActive: true
    });

    // ================================================
    // RETURN POPULATED DATA
    // ================================================

    return await Notification.findById(notification._id).populate("student");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL NOTIFICATIONS
// =====================================================

const getAllNotifications = async () => {
  try {
    const notifications = await Notification.find({
      isActive: true
    })
      .populate("student")
      .sort({
        createdAt: -1
      });

    return notifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET NOTIFICATIONS BY STUDENT
// =====================================================

const getNotificationsByStudent = async (studentId) => {
  try {
    // ================================================
    // CHECK STUDENT
    // ================================================

    const studentExists = await Student.findById(studentId);

    if (!studentExists) {
      throw new Error("Student not found");
    }

    // ================================================
    // GET NOTIFICATIONS
    // ================================================

    const notifications = await Notification.find({
      student: studentId,
      isActive: true
    }).sort({
      createdAt: -1
    });

    return notifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET UNREAD NOTIFICATIONS
// =====================================================

const getUnreadNotifications = async (studentId) => {
  try {
    const studentExists = await Student.findById(studentId);

    if (!studentExists) {
      throw new Error("Student not found");
    }

    const notifications = await Notification.find({
      student: studentId,
      isRead: false,
      isActive: true
    }).sort({
      createdAt: -1
    });

    return notifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET NOTIFICATION BY ID
// =====================================================

const getNotificationById = async (id) => {
  try {
    const notification = await Notification.findOne({
      _id: id,
      isActive: true
    }).populate("student");

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// MARK ONE NOTIFICATION AS READ
// =====================================================

const markAsRead = async (id) => {
  try {
    const notification = await Notification.findOne({
      _id: id,
      isActive: true
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    notification.isRead = true;

    notification.readAt = new Date();

    await notification.save();

    return notification;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// MARK ALL NOTIFICATIONS AS READ
// =====================================================

const markAllAsRead = async (studentId) => {
  try {
    const studentExists = await Student.findById(studentId);

    if (!studentExists) {
      throw new Error("Student not found");
    }

    const result = await Notification.updateMany(
      {
        student: studentId,
        isRead: false,
        isActive: true
      },
      {
        $set: {
          isRead: true,
          readAt: new Date()
        }
      }
    );

    return {
      modifiedCount: result.modifiedCount
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE NOTIFICATION
// =====================================================

const deleteNotification = async (id) => {
  try {
    const notification = await Notification.findOne({
      _id: id,
      isActive: true
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    // ================================================
    // SOFT DELETE
    // ================================================

    notification.isActive = false;

    await notification.save();

    return {
      message: "Notification deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
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
