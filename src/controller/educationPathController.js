const EducationPath = require("../model/educationPathModel");

exports.createEducationPath = async (req, res) => {
  try {
    const data = await EducationPath.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Education path created successfully",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getEducationPaths = async (req, res) => {
  try {
    const data = await EducationPath.find({
      isActive: true
    }).populate("careers");

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

exports.getEducationPathById = async (req, res) => {
  try {
    const data = await EducationPath.findById(req.params.id).populate(
      "careers"
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Education path not found"
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

exports.updateEducationPath = async (req, res) => {
  try {
    const data = await EducationPath.findByIdAndUpdate(
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
        message: "Education path not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education path updated successfully",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteEducationPath = async (req, res) => {
  try {
    const data = await EducationPath.findByIdAndUpdate(
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
        message: "Education path not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education path deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
