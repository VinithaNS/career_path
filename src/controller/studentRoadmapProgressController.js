const StudentRoadmapProgress = require("../model/studentRoadmapProgressModel");

// CREATE
exports.createRoadmapProgress = async (req, res) => {
  try {
    const progress = await StudentRoadmapProgress.create(req.body);

    const populatedProgress = await StudentRoadmapProgress.findById(
      progress._id
    )
      .populate("student")
      .populate("roadmap")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications");

    res.status(201).json({
      success: true,
      message: "Roadmap progress created successfully",
      data: populatedProgress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL
exports.getRoadmapProgress = async (req, res) => {
  try {
    const progress = await StudentRoadmapProgress.find()
      .populate("student")
      .populate("roadmap")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications")
      .sort({ year: 1 });

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY ID
exports.getRoadmapProgressById = async (req, res) => {
  try {
    const progress = await StudentRoadmapProgress.findById(req.params.id)
      .populate("student")
      .populate("roadmap")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications");

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Roadmap progress not found"
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET BY STUDENT
exports.getRoadmapProgressByStudent = async (req, res) => {
  try {
    const progress = await StudentRoadmapProgress.find({
      student: req.params.studentId
    })
      .populate("roadmap")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications")
      .sort({ year: 1 });

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
exports.updateRoadmapProgress = async (req, res) => {
  try {
    const progress = await StudentRoadmapProgress.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("student")
      .populate("roadmap")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications");

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Roadmap progress not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Roadmap progress updated successfully",
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
exports.deleteRoadmapProgress = async (req, res) => {
  try {
    const progress = await StudentRoadmapProgress.findByIdAndDelete(
      req.params.id
    );

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Roadmap progress not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Roadmap progress deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
