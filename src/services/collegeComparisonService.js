const CollegeComparison = require("../model/collegeComparisonModel");
const College = require("../model/collegeModel");
const CollegeCourse = require("../model/collegeCourseModel");

// =====================================================
// CREATE COMPARISON
// =====================================================

const createCollegeComparison = async (data) => {
  try {
    // At least two colleges are required
    if (!data.colleges || data.colleges.length < 2) {
      throw new Error("At least two colleges are required for comparison");
    }

    // Check colleges
    const colleges = await College.find({
      _id: {
        $in: data.colleges
      },
      isActive: true
    });

    if (colleges.length !== data.colleges.length) {
      throw new Error("One or more colleges not found");
    }

    // Check selected courses
    if (data.selectedCourses && data.selectedCourses.length > 0) {
      const courses = await CollegeCourse.find({
        _id: {
          $in: data.selectedCourses
        }
      });

      if (courses.length !== data.selectedCourses.length) {
        throw new Error("One or more courses not found");
      }
    }

    const comparison = await CollegeComparison.create(data);

    return await CollegeComparison.findById(comparison._id)
      .populate("colleges")
      .populate("selectedCourses")
      .populate("createdBy");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL COMPARISONS
// =====================================================

const getAllCollegeComparisons = async () => {
  try {
    const comparisons = await CollegeComparison.find()
      .populate("colleges")
      .populate("selectedCourses")
      .populate("createdBy")
      .sort({
        createdAt: -1
      });

    return comparisons;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE COMPARISONS
// =====================================================

const getActiveCollegeComparisons = async () => {
  try {
    const comparisons = await CollegeComparison.find({
      isActive: true
    })
      .populate("colleges")
      .populate("selectedCourses")
      .populate("createdBy")
      .sort({
        createdAt: -1
      });

    return comparisons;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COMPARISON BY ID
// =====================================================

const getCollegeComparisonById = async (id) => {
  try {
    const comparison = await CollegeComparison.findById(id)
      .populate("colleges")
      .populate("selectedCourses")
      .populate("createdBy");

    if (!comparison) {
      throw new Error("College comparison not found");
    }

    return comparison;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE COMPARISON
// =====================================================

const updateCollegeComparison = async (id, data) => {
  try {
    const existingComparison = await CollegeComparison.findById(id);

    if (!existingComparison) {
      throw new Error("College comparison not found");
    }

    // Validate colleges
    if (data.colleges) {
      if (data.colleges.length < 2) {
        throw new Error("At least two colleges are required for comparison");
      }

      const colleges = await College.find({
        _id: {
          $in: data.colleges
        },
        isActive: true
      });

      if (colleges.length !== data.colleges.length) {
        throw new Error("One or more colleges not found");
      }
    }

    // Validate courses
    if (data.selectedCourses && data.selectedCourses.length > 0) {
      const courses = await CollegeCourse.find({
        _id: {
          $in: data.selectedCourses
        }
      });

      if (courses.length !== data.selectedCourses.length) {
        throw new Error("One or more courses not found");
      }
    }

    const updatedComparison = await CollegeComparison.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("colleges")
      .populate("selectedCourses")
      .populate("createdBy");

    return updatedComparison;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE COMPARISON
// =====================================================

const deleteCollegeComparison = async (id) => {
  try {
    const comparison = await CollegeComparison.findById(id);

    if (!comparison) {
      throw new Error("College comparison not found");
    }

    await CollegeComparison.findByIdAndDelete(id);

    return {
      message: "College comparison deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCollegeComparison,
  getAllCollegeComparisons,
  getActiveCollegeComparisons,
  getCollegeComparisonById,
  updateCollegeComparison,
  deleteCollegeComparison
};
