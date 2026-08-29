const careerService = require("../services/careerService");

// =====================================================
// CREATE CAREER
// =====================================================

const createCareer = async (req, res) => {
  try {
    const career = await careerService.createCareer(req.body);

    return res.status(201).json({
      success: true,
      message: "Career created successfully",
      data: career
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL CAREERS
// =====================================================

const getAllCareers = async (req, res) => {
  try {
    const careers = await careerService.getAllCareers();

    return res.status(200).json({
      success: true,
      message: "Careers fetched successfully",
      count: careers.length,
      data: careers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET CAREER BY ID
// =====================================================

const getCareerById = async (req, res) => {
  try {
    const career = await careerService.getCareerById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Career fetched successfully",
      data: career
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE CAREER
// =====================================================

const updateCareer = async (req, res) => {
  try {
    const career = await careerService.updateCareer(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Career updated successfully",
      data: career
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE CAREER
// =====================================================

const deleteCareer = async (req, res) => {
  try {
    await careerService.deleteCareer(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Career deleted successfully"
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEARCH CAREERS
// =====================================================

const searchCareers = async (req, res) => {
  try {
    const { search } = req.query;

    const careers = await careerService.searchCareers(search);

    return res.status(200).json({
      success: true,
      message: "Career search completed successfully",
      count: careers.length,
      data: careers
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET FEATURED CAREERS
// =====================================================

const getFeaturedCareers = async (req, res) => {
  try {
    const careers = await careerService.getFeaturedCareers();

    return res.status(200).json({
      success: true,
      message: "Featured careers fetched successfully",
      count: careers.length,
      data: careers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
  searchCareers,
  getFeaturedCareers
};
