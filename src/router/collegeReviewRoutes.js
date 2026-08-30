const express = require("express");

const router = express.Router();

const {
  createCollegeReview,
  getAllCollegeReviews,
  getActiveCollegeReviews,
  getCollegeReviewById,
  getReviewsByCollege,
  getReviewsByCourse,
  updateCollegeReview,
  deleteCollegeReview
} = require("../controller/collegeReviewController");

// CREATE
router.post("/create", createCollegeReview);

// GET ALL
router.get("/all", getAllCollegeReviews);

// GET ACTIVE
router.get("/active", getActiveCollegeReviews);

// GET BY COLLEGE
router.get("/college/:collegeId", getReviewsByCollege);

// GET BY COURSE
router.get("/course/:courseId", getReviewsByCourse);

// GET BY ID
router.get("/:id", getCollegeReviewById);

// UPDATE
router.put("/update/:id", updateCollegeReview);

// DELETE
router.delete("/delete/:id", deleteCollegeReview);

module.exports = router;
