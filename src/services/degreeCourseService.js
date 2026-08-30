const DegreeCourse = require("../model/degreeCourseModel");

// =====================================================
// CREATE DEGREE COURSE
// =====================================================

const createDegreeCourse = async (data) => {
  try {
    const {
      categoryId,
      courseName,
      courseCode,
      shortDescription,
      description,
      degreeType,
      duration,
      eligibility,
      admissionProcess,
      subjects,
      skills,
      careerOptions,
      colleges,
      averageSalary,
      jobRoles,
      higherStudies,
      imageUrl,
      displayOrder,
      isActive
    } = data;

    // Check duplicate course code
    const existingCourse = await DegreeCourse.findOne({
      courseCode: courseCode.toUpperCase()
    });

    if (existingCourse) {
      throw new Error("Degree course code already exists");
    }

    const course = await DegreeCourse.create({
      categoryId,
      courseName,
      courseCode: courseCode.toUpperCase(),
      shortDescription,
      description,
      degreeType,
      duration,
      eligibility,
      admissionProcess,
      subjects,
      skills,
      careerOptions,
      colleges,
      averageSalary,
      jobRoles,
      higherStudies,
      imageUrl,
      displayOrder,
      isActive
    });

    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL DEGREE COURSES
// =====================================================

const getAllDegreeCourses = async () => {
  try {
    const courses = await DegreeCourse.find()
      .populate("categoryId", "name")
      .populate("careerOptions");
    //   .populate("colleges")
    //   .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE DEGREE COURSES
// =====================================================

const getActiveDegreeCourses = async () => {
  try {
    const courses = await DegreeCourse.find({
      isActive: true
    })
      .populate("categoryId", "name")
      .populate("careerOptions");
    //   .populate("colleges")
    //   .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET DEGREE COURSE BY ID
// =====================================================

const getDegreeCourseById = async (id) => {
  try {
    const course = await DegreeCourse.findById(id)
      .populate("categoryId", "name")
      .populate("careerOptions");
    //   .populate("colleges");

    if (!course) {
      throw new Error("Degree course not found");
    }

    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET DEGREE COURSES BY CATEGORY
// =====================================================

const getDegreeCoursesByCategory = async (categoryId) => {
  try {
    const courses = await DegreeCourse.find({
      categoryId,
      isActive: true
    })
      .populate("categoryId", "name")
      .populate("careerOptions");
    //   .populate("colleges")
    //   .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH DEGREE COURSES
// =====================================================

const searchDegreeCourses = async (search) => {
  try {
    const courses = await DegreeCourse.find({
      isActive: true,
      $or: [
        {
          courseName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          courseCode: {
            $regex: search,
            $options: "i"
          }
        },
        {
          shortDescription: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    })
      .populate("categoryId", "name")
      .populate("careerOptions");
    //   .populate("colleges")
    //   .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE DEGREE COURSE
// =====================================================

const updateDegreeCourse = async (id, data) => {
  try {
    const existingCourse = await DegreeCourse.findById(id);

    if (!existingCourse) {
      throw new Error("Degree course not found");
    }

    // Check duplicate course code
    if (data.courseCode) {
      const duplicateCourse = await DegreeCourse.findOne({
        courseCode: data.courseCode.toUpperCase(),
        _id: { $ne: id }
      });

      if (duplicateCourse) {
        throw new Error("Degree course code already exists");
      }

      data.courseCode = data.courseCode.toUpperCase();
    }

    const updatedCourse = await DegreeCourse.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
      .populate("categoryId", "name")
      .populate("careerOptions");
    //   .populate("colleges");

    return updatedCourse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE DEGREE COURSE
// =====================================================

const deleteDegreeCourse = async (id) => {
  try {
    const course = await DegreeCourse.findById(id);

    if (!course) {
      throw new Error("Degree course not found");
    }

    await DegreeCourse.findByIdAndDelete(id);

    return {
      message: "Degree course deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createDegreeCourse,
  getAllDegreeCourses,
  getActiveDegreeCourses,
  getDegreeCourseById,
  getDegreeCoursesByCategory,
  searchDegreeCourses,
  updateDegreeCourse,
  deleteDegreeCourse
};
