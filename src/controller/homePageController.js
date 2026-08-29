const homePageService = require("../services/homePageService");

// =====================================================
// CREATE HOME PAGE
// =====================================================

const createHomePage = async (req, res) => {
  try {
    const homePage = await homePageService.createHomePage(req.body);

    return res.status(201).json({
      success: true,
      message: "Home page created successfully",
      data: homePage
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET HOME PAGE
// =====================================================

const getHomePage = async (req, res) => {
  try {
    const homePage = await homePageService.getHomePage();

    return res.status(200).json({
      success: true,
      message: "Home page fetched successfully",
      data: homePage
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET HOME PAGE BY ID
// =====================================================

const getHomePageById = async (req, res) => {
  try {
    const homePage = await homePageService.getHomePageById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Home page fetched successfully",
      data: homePage
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE HOME PAGE
// =====================================================

const updateHomePage = async (req, res) => {
  try {
    const homePage = await homePageService.updateHomePage(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Home page updated successfully",
      data: homePage
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE HOME PAGE
// =====================================================

const deleteHomePage = async (req, res) => {
  try {
    await homePageService.deleteHomePage(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Home page deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createHomePage,
  getHomePage,
  getHomePageById,
  updateHomePage,
  deleteHomePage
};
