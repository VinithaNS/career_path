const CareerEligibility = require("../model/careerEligibilityModel");

// CREATE
exports.createCareerEligibility = async (req, res) => {
  try {
    const eligibility = await CareerEligibility.create(req.body);

    const result = await CareerEligibility.findById(eligibility._id)
      .populate("career")
      .populate("eleventhGroup")
      .populate("diplomaCourse")
      .populate("degreeCourse")
      .populate("requiredSubjects")
      .populate("entranceExams");

    return res.status(201).json({
      success: true,
      message: "Career eligibility created successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL
exports.getCareerEligibilities = async (req, res) => {
  try {
    const data = await CareerEligibility.find({
      isActive: true
    })
      .populate("career")
      .populate("eleventhGroup")
      .populate("diplomaCourse")
      .populate("degreeCourse")
      .populate("requiredSubjects")
      .populate("entranceExams");

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
exports.getCareerEligibilityById = async (req, res) => {
  try {
    const data = await CareerEligibility.findById(req.params.id)
      .populate("career")
      .populate("eleventhGroup")
      .populate("diplomaCourse")
      .populate("degreeCourse")
      .populate("requiredSubjects")
      .populate("entranceExams");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Career eligibility not found"
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

// GET CAREERS BY GROUP
exports.getCareersByGroup = async (req, res) => {
  try {
    const data = await CareerEligibility.find({
      eleventhGroup: req.params.groupId,
      isActive: true
    })
      .populate("career")
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
exports.updateCareerEligibility = async (req, res) => {
  try {
    const data = await CareerEligibility.findByIdAndUpdate(
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
        message: "Career eligibility not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career eligibility updated successfully",
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
exports.deleteCareerEligibility = async (req, res) => {
  try {
    const data = await CareerEligibility.findByIdAndUpdate(
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
        message: "Career eligibility not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career eligibility deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
