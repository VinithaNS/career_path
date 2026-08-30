const certificationService = require("../services/certificationService");

// =====================================================
// CREATE
// =====================================================

const createCertification = async (req, res) => {
  try {
    const certification = await certificationService.createCertification(
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification
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

const getAllCertifications = async (req, res) => {
  try {
    const certifications = await certificationService.getAllCertifications();

    return res.status(200).json({
      success: true,
      message: "Certifications fetched successfully",
      data: certifications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE
// =====================================================

const getActiveCertifications = async (req, res) => {
  try {
    const certifications = await certificationService.getActiveCertifications();

    return res.status(200).json({
      success: true,
      message: "Active certifications fetched successfully",
      data: certifications
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

const getCertificationById = async (req, res) => {
  try {
    const certification = await certificationService.getCertificationById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Certification fetched successfully",
      data: certification
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEARCH
// =====================================================

const searchCertifications = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const certifications =
      await certificationService.searchCertifications(search);

    return res.status(200).json({
      success: true,
      message: "Certification search completed successfully",
      data: certifications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET BY SKILL
// =====================================================

const getCertificationsBySkill = async (req, res) => {
  try {
    const certifications = await certificationService.getCertificationsBySkill(
      req.params.skillId
    );

    return res.status(200).json({
      success: true,
      message: "Certifications fetched successfully",
      data: certifications
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE
// =====================================================

const updateCertification = async (req, res) => {
  try {
    const certification = await certificationService.updateCertification(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification
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

const deleteCertification = async (req, res) => {
  try {
    const result = await certificationService.deleteCertification(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createCertification,
  getAllCertifications,
  getActiveCertifications,
  getCertificationById,
  searchCertifications,
  getCertificationsBySkill,
  updateCertification,
  deleteCertification
};
