const express = require("express");

const router = express.Router();

const {
  createResourceCategory,
  getAllResourceCategories,
  getActiveResourceCategories,
  getResourceCategoryById,
  updateResourceCategory,
  deleteResourceCategory
} = require("../controller/resourceCategoryController");

// CREATE
router.post("/create", createResourceCategory);

// GET ALL
router.get("/all", getAllResourceCategories);

// GET ACTIVE
router.get("/active", getActiveResourceCategories);

// GET BY ID
router.get("/:id", getResourceCategoryById);

// UPDATE
router.put("/update/:id", updateResourceCategory);

// DELETE
router.delete("/delete/:id", deleteResourceCategory);

module.exports = router;
