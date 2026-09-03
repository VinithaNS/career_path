const CollegeAdmission = require("../model/collegeAdmissionModel");

// CREATE
exports.createCollegeAdmission = async (req, res) => {
  try {
    const data = await CollegeAdmission.create(req.body);

    return res.status(201).json({
      success: true,
      message: "College admission created successfully",
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
exports.getCollegeAdmissions = async (req, res) => {
  try {
    const data = await CollegeAdmission.find({
      isActive: true
    })
      .populate("college")
      .populate("course")
      .populate("requiredSubjects");

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
exports.getCollegeAdmissionById = async (req, res) => {
  try {
    const data = await CollegeAdmission.findById(req.params.id)
      .populate("college")
      .populate("course")
      .populate("requiredSubjects");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "College admission not found"
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

// GET BY COLLEGE
exports.getAdmissionsByCollege = async (req, res) => {
  try {
    const data = await CollegeAdmission.find({
      college: req.params.collegeId,
      isActive: true
    })
      .populate("college")
      .populate("course")
      .populate("requiredSubjects");

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

// GET BY COURSE
exports.getAdmissionsByCourse = async (req, res) => {
  try {
    const data = await CollegeAdmission.find({
      course: req.params.courseId,
      isActive: true
    })
      .populate("college")
      .populate("course")
      .populate("requiredSubjects");

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

// UPDATE
exports.updateCollegeAdmission = async (req, res) => {
  try {
    const data = await CollegeAdmission.findByIdAndUpdate(
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
        message: "College admission not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "College admission updated successfully",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE / DEACTIVATE
exports.deleteCollegeAdmission = async (req, res) => {
  try {
    const data = await CollegeAdmission.findByIdAndUpdate(
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
        message: "College admission not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "College admission removed successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
