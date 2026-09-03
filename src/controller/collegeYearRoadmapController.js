const CollegeYearRoadmap = require("../model/collegeYearRoadmapModel");

// CREATE
exports.createCollegeYearRoadmap = async (req, res) => {
  try {
    const data = await CollegeYearRoadmap.create(req.body);

    return res.status(201).json({
      success: true,
      message: "College year roadmap created successfully",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL
exports.getCollegeYearRoadmaps = async (req, res) => {
  try {
    const data = await CollegeYearRoadmap.find({
      isActive: true
    })
      .populate("college")
      .populate("course")
      .populate("skills")
      .populate("subjects")
      .populate("projects")
      .populate("certifications")
      .populate("recommendedCareers")
      .sort({
        year: 1
      });

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY ID
exports.getCollegeYearRoadmapById = async (req, res) => {
  try {
    const data = await CollegeYearRoadmap.findById(req.params.id)
      .populate("college")
      .populate("course")
      .populate("skills")
      .populate("subjects")
      .populate("projects")
      .populate("certifications")
      .populate("recommendedCareers");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "College year roadmap not found"
      });
    }

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY COURSE
exports.getRoadmapByCourse = async (req, res) => {
  try {
    const data = await CollegeYearRoadmap.find({
      course: req.params.courseId,
      isActive: true
    })
      .populate("college")
      .populate("course")
      .populate("skills")
      .populate("subjects")
      .populate("projects")
      .populate("certifications")
      .populate("recommendedCareers")
      .sort({
        year: 1
      });

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY COURSE + YEAR
exports.getRoadmapByCourseAndYear = async (req, res) => {
  try {
    const data = await CollegeYearRoadmap.findOne({
      course: req.params.courseId,
      year: req.params.year,
      isActive: true
    })
      .populate("college")
      .populate("course")
      .populate("skills")
      .populate("subjects")
      .populate("projects")
      .populate("certifications")
      .populate("recommendedCareers");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found for this year"
      });
    }

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
exports.updateCollegeYearRoadmap = async (req, res) => {
  try {
    const data = await CollegeYearRoadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "College year roadmap not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "College year roadmap updated successfully",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
exports.deleteCollegeYearRoadmap = async (req, res) => {
  try {
    const data = await CollegeYearRoadmap.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false
      },
      {
        new: true
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "College year roadmap not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "College year roadmap removed successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
