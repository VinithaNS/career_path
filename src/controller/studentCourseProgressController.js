const StudentCourseProgress = require("../model/studentCourseProgressModel");

// CREATE
exports.createCourseProgress = async (req, res) => {
  try {
    const progress = await StudentCourseProgress.create(req.body);

    const populatedProgress = await StudentCourseProgress.findById(progress._id)
      .populate("student")
      .populate("college")
      .populate("course")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications");

    res.status(201).json({
      success: true,
      message: "Student course progress created successfully",
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
exports.getCourseProgress = async (req, res) => {
  try {
    const progress = await StudentCourseProgress.find()
      .populate("student")
      .populate("college")
      .populate("course")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications")
      .sort({ updatedAt: -1 });

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
exports.getCourseProgressById = async (req, res) => {
  try {
    const progress = await StudentCourseProgress.findById(req.params.id)
      .populate("student")
      .populate("college")
      .populate("course")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications");

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found"
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
exports.getProgressByStudent = async (req, res) => {
  try {
    const progress = await StudentCourseProgress.find({
      student: req.params.studentId
    })
      .populate("college")
      .populate("course")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications");

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
exports.updateCourseProgress = async (req, res) => {
  try {
    const progress = await StudentCourseProgress.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastUpdated: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate("student")
      .populate("college")
      .populate("course")
      .populate("completedSkills")
      .populate("completedProjects")
      .populate("completedCertifications");

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
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
exports.deleteCourseProgress = async (req, res) => {
  try {
    const progress = await StudentCourseProgress.findByIdAndDelete(
      req.params.id
    );

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course progress deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
