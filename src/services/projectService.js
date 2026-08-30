const Project = require("../model/projectModel");

// =====================================================
// CREATE PROJECT
// =====================================================

const createProject = async (data) => {
  try {
    const existingProject = await Project.findOne({
      projectCode: data.projectCode.toUpperCase()
    });

    if (existingProject) {
      throw new Error("Project code already exists");
    }

    const project = await Project.create({
      ...data,
      projectCode: data.projectCode.toUpperCase()
    });

    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL PROJECTS
// =====================================================

const getAllProjects = async () => {
  try {
    const projects = await Project.find()
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("certifications")
      .sort({ displayOrder: 1 });

    return projects;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE PROJECTS
// =====================================================

const getActiveProjects = async () => {
  try {
    const projects = await Project.find({
      isActive: true
    })
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("certifications")
      .sort({ displayOrder: 1 });

    return projects;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET PROJECT BY ID
// =====================================================

const getProjectById = async (id) => {
  try {
    const project = await Project.findById(id)
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("certifications");

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH PROJECTS
// =====================================================

const searchProjects = async (search) => {
  try {
    const projects = await Project.find({
      isActive: true,
      $or: [
        {
          projectName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          projectCode: {
            $regex: search,
            $options: "i"
          }
        },
        {
          shortDescription: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    })
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("certifications")
      .sort({ displayOrder: 1 });

    return projects;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET PROJECTS BY SKILL
// =====================================================

const getProjectsBySkill = async (skillId) => {
  try {
    const projects = await Project.find({
      skills: skillId,
      isActive: true
    })
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("certifications")
      .sort({ displayOrder: 1 });

    return projects;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET PROJECTS BY CAREER
// =====================================================

const getProjectsByCareer = async (careerId) => {
  try {
    const projects = await Project.find({
      relatedCareers: careerId,
      isActive: true
    })
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("certifications")
      .sort({ displayOrder: 1 });

    return projects;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE PROJECT
// =====================================================

const updateProject = async (id, data) => {
  try {
    const existingProject = await Project.findById(id);

    if (!existingProject) {
      throw new Error("Project not found");
    }

    if (data.projectCode) {
      const duplicateProject = await Project.findOne({
        projectCode: data.projectCode.toUpperCase(),
        _id: {
          $ne: id
        }
      });

      if (duplicateProject) {
        throw new Error("Project code already exists");
      }

      data.projectCode = data.projectCode.toUpperCase();
    }

    const updatedProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("certifications");

    return updatedProject;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE PROJECT
// =====================================================

const deleteProject = async (id) => {
  try {
    const project = await Project.findById(id);

    if (!project) {
      throw new Error("Project not found");
    }

    await Project.findByIdAndDelete(id);

    return {
      message: "Project deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
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
