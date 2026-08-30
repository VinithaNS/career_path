const projectService = require("../services/projectService");

// =====================================================
// CREATE PROJECT
// =====================================================

const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ALL PROJECTS
// =====================================================

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET ACTIVE PROJECTS
// =====================================================

const getActiveProjects = async (req, res) => {
  try {
    const projects = await projectService.getActiveProjects();

    return res.status(200).json({
      success: true,
      message: "Active projects fetched successfully",
      data: projects
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET PROJECT BY ID
// =====================================================

const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// SEARCH PROJECTS
// =====================================================

const searchProjects = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const projects = await projectService.searchProjects(search);

    return res.status(200).json({
      success: true,
      message: "Project search completed successfully",
      data: projects
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET PROJECTS BY SKILL
// =====================================================

const getProjectsBySkill = async (req, res) => {
  try {
    const projects = await projectService.getProjectsBySkill(
      req.params.skillId
    );

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// GET PROJECTS BY CAREER
// =====================================================

const getProjectsByCareer = async (req, res) => {
  try {
    const projects = await projectService.getProjectsByCareer(
      req.params.careerId
    );

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// UPDATE PROJECT
// =====================================================

const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// =====================================================
// DELETE PROJECT
// =====================================================

const deleteProject = async (req, res) => {
  try {
    const result = await projectService.deleteProject(req.params.id);

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
  createProject,
  getAllProjects,
  getActiveProjects,
  getProjectById,
  searchProjects,
  getProjectsBySkill,
  getProjectsByCareer,
  updateProject,
  deleteProject
};
