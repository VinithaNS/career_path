const TenthStream = require("../model/core/tenthStream");

// GET /tenth-streams/active
exports.getActiveTenthStreams = async (req, res) => {
  try {
    const streams = await TenthStream.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .populate("relatedDepartments", "name slug")
      .populate("relatedSkills", "name slug");

    res.status(200).json(streams);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch active tenth streams",
      error: error.message
    });
  }
};

// GET /tenth-streams/all
exports.getAllTenthStreams = async (req, res) => {
  try {
    const streams = await TenthStream.find()
      .sort({ order: 1, name: 1 })
      .populate("relatedDepartments", "name slug")
      .populate("relatedSkills", "name slug");

    res.status(200).json(streams);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tenth streams",
      error: error.message
    });
  }
};

// GET /tenth-streams/:id
exports.getTenthStreamById = async (req, res) => {
  try {
    const stream = await TenthStream.findById(req.params.id)
      .populate("relatedDepartments", "name slug shortDescription")
      .populate("relatedSkills", "name slug");

    if (!stream) {
      return res.status(404).json({ message: "Tenth stream not found" });
    }

    res.status(200).json(stream);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tenth stream",
      error: error.message
    });
  }
};

// POST /tenth-streams  (admin)
exports.createTenthStream = async (req, res) => {
  try {
    const stream = await TenthStream.create(req.body);
    res.status(201).json(stream);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create tenth stream",
      error: error.message
    });
  }
};

// PUT /tenth-streams/:id  (admin)
exports.updateTenthStream = async (req, res) => {
  try {
    const stream = await TenthStream.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!stream) {
      return res.status(404).json({ message: "Tenth stream not found" });
    }

    res.status(200).json(stream);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update tenth stream",
      error: error.message
    });
  }
};

// DELETE /tenth-streams/:id  (admin)
exports.deleteTenthStream = async (req, res) => {
  try {
    const stream = await TenthStream.findByIdAndDelete(req.params.id);

    if (!stream) {
      return res.status(404).json({ message: "Tenth stream not found" });
    }

    res.status(200).json({ message: "Tenth stream deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete tenth stream",
      error: error.message
    });
  }
};
