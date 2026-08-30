const DiplomaCourse = require("../model/diplomaCourseModel");

// =====================================================
// CREATE DIPLOMA COURSE
// =====================================================

const createDiplomaCourse = async (data) => {
  try {
    const {
      categoryId,
      courseName,
      courseCode,
      shortDescription,
      description,
      duration,
      eligibility,
      admissionProcess,
      subjects,
      skills,
      careerOptions,
      colleges,
      averageSalary,
      jobRoles,
      imageUrl,
      displayOrder,
      isActive
    } = data;

    // Check duplicate course code
    const existingCourse = await DiplomaCourse.findOne({
      courseCode: courseCode.toUpperCase()
    });

    if (existingCourse) {
      throw new Error("Course code already exists");
    }

    const course = await DiplomaCourse.create({
      categoryId,
      courseName,
      courseCode: courseCode.toUpperCase(),
      shortDescription,
      description,
      duration,
      eligibility,
      admissionProcess,
      subjects,
      skills,
      careerOptions,
      colleges,
      averageSalary,
      jobRoles,
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
// GET ALL DIPLOMA COURSES
// =====================================================

const getAllDiplomaCourses = async () => {
  try {
    const courses = await DiplomaCourse.find().populate("categoryId", "name");
    //   .populate("careerOptions")
    //   .populate("colleges")

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE DIPLOMA COURSES
// =====================================================

const getActiveDiplomaCourses = async () => {
  try {
    const courses = await DiplomaCourse.find({
      isActive: true
    }).populate("categoryId", "name");
    //   .populate("careerOptions")
    //   .populate("colleges")
    //   .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET DIPLOMA COURSE BY ID
// =====================================================

const getDiplomaCourseById = async (id) => {
  try {
    const course = await DiplomaCourse.findById(id).populate(
      "categoryId",
      "name"
    );
    //   .populate("careerOptions")
    //   .populate("colleges");

    if (!course) {
      throw new Error("Diploma course not found");
    }

    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COURSES BY CATEGORY
// =====================================================

const getDiplomaCoursesByCategory = async (categoryId) => {
  try {
    const courses = await DiplomaCourse.find({
      categoryId,
      isActive: true
    }).populate("categoryId", "name");
    //   .populate("careerOptions")
    //   .populate("colleges")
    //   .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH DIPLOMA COURSES
// =====================================================

const searchDiplomaCourses = async (search) => {
  try {
    const courses = await DiplomaCourse.find({
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
    }).populate("categoryId", "name");
    //   .populate("careerOptions")
    //   .populate("colleges")
    //   .sort({ displayOrder: 1 });

    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE DIPLOMA COURSE
// =====================================================

const updateDiplomaCourse = async (id, data) => {
  try {
    const existingCourse = await DiplomaCourse.findById(id);

    if (!existingCourse) {
      throw new Error("Diploma course not found");
    }

    // Check duplicate course code
    if (data.courseCode) {
      const duplicateCourse = await DiplomaCourse.findOne({
        courseCode: data.courseCode.toUpperCase(),
        _id: { $ne: id }
      });

      if (duplicateCourse) {
        throw new Error("Course code already exists");
      }

      data.courseCode = data.courseCode.toUpperCase();
    }

    const updatedCourse = await DiplomaCourse.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("categoryId", "name");
    //   .populate("careerOptions")
    //   .populate("colleges");

    return updatedCourse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE DIPLOMA COURSE
// =====================================================

const deleteDiplomaCourse = async (id) => {
  try {
    const course = await DiplomaCourse.findById(id);

    if (!course) {
      throw new Error("Diploma course not found");
    }

    await DiplomaCourse.findByIdAndDelete(id);

    return {
      message: "Diploma course deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createDiplomaCourse,
  getAllDiplomaCourses,
  getActiveDiplomaCourses,
  getDiplomaCourseById,
  getDiplomaCoursesByCategory,
  searchDiplomaCourses,
  updateDiplomaCourse,
  deleteDiplomaCourse
};
