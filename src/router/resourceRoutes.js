const express = require("express");

const router = express.Router();

const {
  createResource,
  getAllResources,
  getActiveResources,
  getFeaturedResources,
  getResourceById,
  getResourcesByCategory,
  updateResource,
  deleteResource
} = require("../controller/resourceController");

// CREATE
router.post("/create", createResource);

// GET ALL
router.get("/all", getAllResources);

// GET ACTIVE
router.get("/active", getActiveResources);

// GET FEATURED
router.get("/featured", getFeaturedResources);

// GET BY CATEGORY
router.get("/category/:categoryId", getResourcesByCategory);

// GET BY ID
router.get("/:id", getResourceById);

// UPDATE
router.put("/update/:id", updateResource);

// DELETE
router.delete("/delete/:id", deleteResource);

module.exports = router;
