const GroupSubject = require("../model/groupSubjectModel");

exports.createGroupSubject = async (req, res) => {
  try {
    const data = await GroupSubject.create(req.body);

    const result = await GroupSubject.findById(data._id)
      .populate("group")
      .populate("subject");

    return res.status(201).json({
      success: true,
      message: "Group subject created successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getGroupSubjects = async (req, res) => {
  try {
    const data = await GroupSubject.find({
      isActive: true
    })
      .populate("group")
      .populate("subject")
      .sort({
        displayOrder: 1
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

exports.getSubjectsByGroup = async (req, res) => {
  try {
    const data = await GroupSubject.find({
      group: req.params.groupId,
      isActive: true
    })
      .populate("subject")
      .sort({
        displayOrder: 1
      });

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

exports.updateGroupSubject = async (req, res) => {
  try {
    const data = await GroupSubject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate("group")
      .populate("subject");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Group subject not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Group subject updated successfully",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteGroupSubject = async (req, res) => {
  try {
    const data = await GroupSubject.findByIdAndUpdate(
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
        message: "Group subject not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Group subject deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
