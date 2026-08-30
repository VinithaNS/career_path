const CollegeCourse = require("../model/collegeCourseModel");
const College = require("../model/collegeModel");

// =====================================================
// CREATE COLLEGE COURSE
// =====================================================

const createCollegeCourse = async (data) => {
  try {
    const college = await College.findById(data.college);

    if (!college) {
      throw new Error("College not found");
    }

    const course = await CollegeCourse.create(data);

    // Add course ID to College
    await College.findByIdAndUpdate(data.college, {
      $addToSet: {
        courses: course._id
      }
    });

    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL COURSES
// =====================================================

const getAllCollegeCourses = async () => {
  try {
    const courses = await CollegeCourse.find()
      .populate("college")
      .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE COURSES
// =====================================================

const getActiveCollegeCourses = async () => {
  try {
    const courses = await CollegeCourse.find({
      isActive: true
    })
      .populate("college")
      .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COURSE BY ID
// =====================================================

const getCollegeCourseById = async (id) => {
  try {
    const course = await CollegeCourse.findById(id).populate("college");

    if (!course) {
      throw new Error("College course not found");
    }

    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COURSES BY COLLEGE
// =====================================================

const getCoursesByCollege = async (collegeId) => {
  try {
    const college = await College.findById(collegeId);

    if (!college) {
      throw new Error("College not found");
    }

    const courses = await CollegeCourse.find({
      college: collegeId,
      isActive: true
    })
      .populate("college")
      .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COURSES BY COURSE TYPE
// =====================================================

const getCoursesByType = async (courseType) => {
  try {
    const courses = await CollegeCourse.find({
      courseType: courseType,
      isActive: true
    })
      .populate("college")
      .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH COURSES
// =====================================================

const searchCollegeCourses = async (search) => {
  try {
    const courses = await CollegeCourse.find({
      isActive: true,
      $or: [
        {
          courseName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          degree: {
            $regex: search,
            $options: "i"
          }
        },
        {
          specialization: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    })
      .populate("college")
      .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE COURSE
// =====================================================

const updateCollegeCourse = async (id, data) => {
  try {
    const existingCourse = await CollegeCourse.findById(id);

    if (!existingCourse) {
      throw new Error("College course not found");
    }

    if (data.college) {
      const college = await College.findById(data.college);

      if (!college) {
        throw new Error("College not found");
      }
    }

    const updatedCourse = await CollegeCourse.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("college");

    return updatedCourse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE COURSE
// =====================================================

const deleteCollegeCourse = async (id) => {
  try {
    const course = await CollegeCourse.findById(id);

    if (!course) {
      throw new Error("College course not found");
    }

    await CollegeCourse.findByIdAndDelete(id);

    // Remove course reference from College
    await College.findByIdAndUpdate(course.college, {
      $pull: {
        courses: course._id
      }
    });

    return {
      message: "College course deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCollegeCourse,
  getAllCollegeCourses,
  getActiveCollegeCourses,
  getCollegeCourseById,
  getCoursesByCollege,
  getCoursesByType,
  searchCollegeCourses,
  updateCollegeCourse,
  deleteCollegeCourse
};
