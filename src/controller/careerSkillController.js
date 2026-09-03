const CareerSkill = require("../model/careerSkillModel");

// CREATE
exports.createCareerSkill = async (req, res) => {
  try {
    const data = await CareerSkill.create(req.body);

    const result = await CareerSkill.findById(data._id)
      .populate("career")
      .populate("skill");

    return res.status(201).json({
      success: true,
      message: "Career skill created successfully",
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
exports.getCareerSkills = async (req, res) => {
  try {
    const data = await CareerSkill.find({
      isActive: true
    })
      .populate("career")
      .populate("skill")
      .sort({
        priority: 1
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

// GET SKILLS BY CAREER
exports.getSkillsByCareer = async (req, res) => {
  try {
    const data = await CareerSkill.find({
      career: req.params.careerId,
      isActive: true
    })
      .populate("skill")
      .sort({
        priority: 1
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
exports.getCareerSkillById = async (req, res) => {
  try {
    const data = await CareerSkill.findById(req.params.id)
      .populate("career")
      .populate("skill");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Career skill not found"
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
exports.updateCareerSkill = async (req, res) => {
  try {
    const data = await CareerSkill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate("career")
      .populate("skill");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Career skill not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career skill updated successfully",
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
exports.deleteCareerSkill = async (req, res) => {
  try {
    const data = await CareerSkill.findByIdAndUpdate(
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
        message: "Career skill deleted successfully"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career skill deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
