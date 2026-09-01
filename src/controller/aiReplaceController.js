const aiReplaceService = require("../services/aiReplaceService");

// =====================================================
// CREATE
// =====================================================

const createAIReplace = async (req, res) => {
  try {
    const result = await aiReplaceService.createAIReplace(req.body);

    return res.status(201).json({
      success: true,
      message: "AI replacement record created successfully",
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

const getAllAIReplacements = async (req, res) => {
  try {
    const result = await aiReplaceService.getAllAIReplacements();

    return res.status(200).json({
      success: true,
      message: "AI replacement records fetched successfully",
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
// GET BY ID
// =====================================================

const getAIReplaceById = async (req, res) => {
  try {
    const result = await aiReplaceService.getAIReplaceById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "AI replacement record fetched successfully",
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
// GET BY SECTOR
// =====================================================

const getBySector = async (req, res) => {
  try {
    const result = await aiReplaceService.getBySector(req.params.sector);

    return res.status(200).json({
      success: true,
      message: "AI replacement records fetched by sector",
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
// GET BY DOMAIN
// =====================================================

const getByDomain = async (req, res) => {
  try {
    const result = await aiReplaceService.getByDomain(req.params.domain);

    return res.status(200).json({
      success: true,
      message: "AI replacement records fetched by domain",
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
// HIGH AUTOMATION
// =====================================================

const getHighAutomationJobs = async (req, res) => {
  try {
    const result = await aiReplaceService.getHighAutomationJobs();

    return res.status(200).json({
      success: true,
      message: "High automation jobs fetched successfully",
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
// UPDATE
// =====================================================

const updateAIReplace = async (req, res) => {
  try {
    const result = await aiReplaceService.updateAIReplace(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "AI replacement record updated successfully",
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
// DELETE
// =====================================================

const deleteAIReplace = async (req, res) => {
  try {
    await aiReplaceService.deleteAIReplace(req.params.id);

    return res.status(200).json({
      success: true,
      message: "AI replacement record deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAIReplace,
  getAllAIReplacements,
  getAIReplaceById,
  getBySector,
  getByDomain,
  getHighAutomationJobs,
  updateAIReplace,
  deleteAIReplace
};
