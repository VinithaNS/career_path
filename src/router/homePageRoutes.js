const express = require("express");

const router = express.Router();

const {
  createHomePage,
  getHomePage,
  getHomePageById,
  updateHomePage,
  deleteHomePage
} = require("../controller/homePageController");

// =====================================================
// CREATE HOME PAGE
// =====================================================

router.post("/create", createHomePage);

// =====================================================
// GET ACTIVE HOME PAGE
// =====================================================

router.get("/active", getHomePage);

// =====================================================
// GET HOME PAGE BY ID
// =====================================================

router.get("/:id", getHomePageById);

// =====================================================
// UPDATE HOME PAGE
// =====================================================

router.put("/update/:id", updateHomePage);

// =====================================================
// DELETE HOME PAGE
// =====================================================

router.delete("/delete/:id", deleteHomePage);

module.exports = router;
