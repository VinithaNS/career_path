const express = require("express");

const router = express.Router();

const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory
} = require("../controller/subCategoryController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// CREATE

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createSubCategory
);

// GET ALL

router.get("/all", getAllSubCategories);

// GET BY CATEGORY

router.get("/category/:categoryId", getSubCategoriesByCategory);

// GET ONE

router.get("/:id", getSubCategoryById);

// UPDATE

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateSubCategory
);

// DELETE

router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteSubCategory
);

module.exports = router;
