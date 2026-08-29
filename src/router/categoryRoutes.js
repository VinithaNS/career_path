const express = require("express");

const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controller/categoryController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// CREATE

router.post("/create", authMiddleware, roleMiddleware("admin"), createCategory);

// GET ALL

router.get("/all", getAllCategories);

// GET ONE

router.get("/:id", getCategoryById);

// UPDATE

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCategory
);

// DELETE

router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCategory
);

module.exports = router;
