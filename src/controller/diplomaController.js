const DiplomaCourse = require("../model/core/diplomaCourseModel");

// GET /diploma-courses/active
exports.getActiveDiplomaCourses = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;

    const courses = await DiplomaCourse.find(filter)
      .sort({ order: 1, name: 1 })
      .populate("lateralEntryOptions", "name slug")
      .populate("relatedSkills", "name slug");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch active diploma courses",
      error: error.message
    });
  }
};

// GET /diploma-courses/all
exports.getAllDiplomaCourses = async (req, res) => {
  try {
    const courses = await DiplomaCourse.find()
      .sort({ order: 1, name: 1 })
      .populate("lateralEntryOptions", "name slug")
      .populate("relatedSkills", "name slug");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch diploma courses",
      error: error.message
    });
  }
};

// GET /diploma-courses/:id
exports.getDiplomaCourseById = async (req, res) => {
  try {
    const course = await DiplomaCourse.findById(req.params.id)
      .populate("lateralEntryOptions", "name slug shortDescription")
      .populate("relatedSkills", "name slug");

    if (!course) {
      return res.status(404).json({ message: "Diploma course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch diploma course",
      error: error.message
    });
  }
};

// POST /diploma-courses  (admin)
exports.createDiplomaCourse = async (req, res) => {
  try {
    const course = await DiplomaCourse.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create diploma course",
      error: error.message
    });
  }
};

// PUT /diploma-courses/:id  (admin)
exports.updateDiplomaCourse = async (req, res) => {
  try {
    const course = await DiplomaCourse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!course) {
      return res.status(404).json({ message: "Diploma course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update diploma course",
      error: error.message
    });
  }
};

// DELETE /diploma-courses/:id  (admin)
exports.deleteDiplomaCourse = async (req, res) => {
  try {
    const course = await DiplomaCourse.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Diploma course not found" });
    }

    res.status(200).json({ message: "Diploma course deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete diploma course",
      error: error.message
    });
  }
};
