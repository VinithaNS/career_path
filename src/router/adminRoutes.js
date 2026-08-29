const express = require("express");

const router = express.Router();

const {
  createAdmin,
  getAdmin,
  updateAdmin,
  getAllUsers,
  getUsersByRole,
  updateUserStatus,
  deleteUser
} = require("../controller/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// ==========================================
// ADMIN PROFILE
// ==========================================

router.post("/create", authMiddleware, roleMiddleware("admin"), createAdmin);

router.get("/all", authMiddleware, roleMiddleware("admin"), getAdmin);

router.put("/update/:id", authMiddleware, roleMiddleware("admin"), updateAdmin);

// ==========================================
// USER MANAGEMENT
// ==========================================

router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);

router.get(
  "/users/role/:role",
  authMiddleware,
  roleMiddleware("admin"),
  getUsersByRole
);

router.patch(
  "/users/:userId/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserStatus
);

router.delete(
  "/delete/:userId",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

module.exports = router;
