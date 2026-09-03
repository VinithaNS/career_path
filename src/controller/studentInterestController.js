const StudentInterest = require("../model/studentInterestModel");

// CREATE / UPDATE INTEREST
exports.createOrUpdateInterest = async (req, res) => {
  try {
    const {
      student,
      interests,
      preferredSubjects,
      preferredCareerCategories,
      preferredWorkType,
      preferredStudyLevel
    } = req.body;

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required"
      });
    }

    const data = await StudentInterest.findOneAndUpdate(
      { student },
      {
        student,
        interests,
        preferredSubjects,
        preferredCareerCategories,
        preferredWorkType,
        preferredStudyLevel
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    const result = await StudentInterest.findById(data._id)
      .populate("student")
      .populate("preferredSubjects");

    return res.status(200).json({
      success: true,
      message: "Student interests saved successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET INTEREST BY STUDENT
exports.getStudentInterest = async (req, res) => {
  try {
    const data = await StudentInterest.findOne({
      student: req.params.studentId,
      isActive: true
    })
      .populate("student")
      .populate("preferredSubjects");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student interests not found"
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
exports.updateStudentInterest = async (req, res) => {
  try {
    const data = await StudentInterest.findOneAndUpdate(
      {
        student: req.params.studentId
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student interests not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student interests updated successfully",
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
exports.deleteStudentInterest = async (req, res) => {
  try {
    const data = await StudentInterest.findOneAndUpdate(
      {
        student: req.params.studentId
      },
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
        message: "Student interests not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student interests removed successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
