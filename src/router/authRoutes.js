const express = require("express");

const {
  register,
  login,
  getMe,
  updateProfile,
  uploadAvatar
} = require("../controller/authController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// PUBLIC
router.post("/register", register);
router.post("/login", login);

// PROTECTED
router.get("/me", authMiddleware, getMe);
router.put("/update-profile", authMiddleware, updateProfile);
router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;
