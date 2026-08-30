// services/collegeReviewService.js

const CollegeReview = require("../model/collegeReviewModel");
const College = require("../model/collegeModel");
const CollegeCourse = require("../model/collegeCourseModel");
const mongoose = require("mongoose");

// =====================================================
// CREATE COLLEGE REVIEW
// =====================================================

const createCollegeReview = async (data) => {
  try {
    if (!data.college || !mongoose.Types.ObjectId.isValid(data.college)) {
      throw new Error("Invalid college ID");
    }

    const college = await College.findById(data.college);

    if (!college) {
      throw new Error("College not found");
    }

    // Check course if provided.
    if (data.course) {
      if (!mongoose.Types.ObjectId.isValid(data.course)) {
        throw new Error("Invalid course ID");
      }

      const course = await CollegeCourse.findById(data.course);

      if (!course) {
        throw new Error("College course not found");
      }

      if (course.college.toString() !== data.college.toString()) {
        throw new Error("Course does not belong to this college");
      }
    }

    const review = await CollegeReview.create(data);

    await updateCollegeRating(data.college);

    return await CollegeReview.findById(review._id)
      .populate("college")
      .populate("course");
  } catch (error) {
    throw error;
  }
};

// =====================================================
// UPDATE COLLEGE RATING
// =====================================================

const updateCollegeRating = async (collegeId) => {
  try {
    if (!collegeId || !mongoose.Types.ObjectId.isValid(collegeId)) {
      throw new Error("Invalid college ID");
    }

    const collegeObjectId = new mongoose.Types.ObjectId(collegeId);

    const result = await CollegeReview.aggregate([
      {
        $match: {
          college: collegeObjectId,
          isApproved: true,
          isActive: true
        }
      },
      {
        $group: {
          _id: "$college",
          averageRating: {
            $avg: "$rating"
          },
          totalReviews: {
            $sum: 1
          }
        }
      }
    ]);

    if (result.length > 0) {
      await College.findByIdAndUpdate(
        collegeId,
        {
          averageRating: Math.round(result[0].averageRating * 10) / 10,
          totalReviews: result[0].totalReviews
        },
        {
          new: true
        }
      );
    } else {
      await College.findByIdAndUpdate(
        collegeId,
        {
          averageRating: 0,
          totalReviews: 0
        },
        {
          new: true
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

// =====================================================
// GET ALL REVIEWS
// =====================================================

const getAllCollegeReviews = async () => {
  try {
    const reviews = await CollegeReview.find()
      .populate("college")
      .populate("course")
      .sort({ createdAt: -1 });

    return reviews;
  } catch (error) {
    throw error;
  }
};

// =====================================================
// GET ACTIVE REVIEWS
// =====================================================

const getActiveCollegeReviews = async () => {
  try {
    const reviews = await CollegeReview.find({
      isActive: true,
      isApproved: true
    })
      .populate("college")
      .populate("course")
      .sort({ createdAt: -1 });

    return reviews;
  } catch (error) {
    throw error;
  }
};

// =====================================================
// GET REVIEW BY ID
// =====================================================

const getCollegeReviewById = async (id) => {
  try {
    // console.log("Review ID received:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid college review ID");
    }

    const review = await CollegeReview.findById(id)
      .populate("college")
      .populate("course");

    console.log("Review found:", review);

    if (!review) {
      throw new Error(`College review not found for ID: ${id}`);
    }

    return review;
  } catch (error) {
    console.error("getCollegeReviewById error:", error);
    throw error;
  }
};

// =====================================================
// GET REVIEWS BY COLLEGE
// =====================================================

const getReviewsByCollege = async (collegeId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      throw new Error("Invalid college ID");
    }

    const college = await College.findById(collegeId);

    if (!college) {
      throw new Error("College not found");
    }

    const reviews = await CollegeReview.find({
      college: collegeId,
      isActive: true,
      isApproved: true
    })
      .populate("college")
      .populate("course")
      .sort({ createdAt: -1 });

    return reviews;
  } catch (error) {
    throw error;
  }
};

// =====================================================
// GET REVIEWS BY COURSE
// =====================================================

const getReviewsByCourse = async (courseId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid course ID");
    }

    const course = await CollegeCourse.findById(courseId);

    if (!course) {
      throw new Error("College course not found");
    }

    const reviews = await CollegeReview.find({
      course: courseId,
      isActive: true,
      isApproved: true
    })
      .populate("college")
      .populate("course")
      .sort({ createdAt: -1 });

    return reviews;
  } catch (error) {
    throw error;
  }
};

// =====================================================
// UPDATE REVIEW
// =====================================================

const updateCollegeReview = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid review ID");
    }

    const existingReview = await CollegeReview.findById(id);

    if (!existingReview) {
      throw new Error("College review not found");
    }

    const oldCollegeId = existingReview.college.toString();

    if (data.college) {
      if (!mongoose.Types.ObjectId.isValid(data.college)) {
        throw new Error("Invalid college ID");
      }

      const college = await College.findById(data.college);

      if (!college) {
        throw new Error("College not found");
      }
    }

    if (data.course) {
      if (!mongoose.Types.ObjectId.isValid(data.course)) {
        throw new Error("Invalid course ID");
      }

      const course = await CollegeCourse.findById(data.course);

      if (!course) {
        throw new Error("College course not found");
      }

      const targetCollegeId = data.college
        ? data.college.toString()
        : oldCollegeId;

      if (course.college.toString() !== targetCollegeId) {
        throw new Error("Course does not belong to this college");
      }
    }

    const updatedReview = await CollegeReview.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
      .populate("college")
      .populate("course");

    // Recalculate old college rating.
    await updateCollegeRating(oldCollegeId);

    // If the review was moved to another college, recalculate that
    // college as well.
    const newCollegeId = updatedReview.college._id.toString();

    if (newCollegeId !== oldCollegeId) {
      await updateCollegeRating(newCollegeId);
    }

    return updatedReview;
  } catch (error) {
    throw error;
  }
};

// =====================================================
// DELETE REVIEW
// =====================================================

const deleteCollegeReview = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid review ID");
    }

    const review = await CollegeReview.findById(id);

    if (!review) {
      throw new Error("College review not found");
    }

    const collegeId = review.college.toString();

    await CollegeReview.findByIdAndDelete(id);

    await updateCollegeRating(collegeId);

    return {
      message: "College review deleted successfully"
    };
  } catch (error) {
    throw error;
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  createCollegeReview,
  updateCollegeRating,
  getAllCollegeReviews,
  getActiveCollegeReviews,
  getCollegeReviewById,
  getReviewsByCollege,
  getReviewsByCourse,
  updateCollegeReview,
  deleteCollegeReview
};
