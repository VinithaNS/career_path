const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});
// Routes
app.use("/api/auth", require("./src/router/authRoutes"));
app.use("/api/students", require("./src/router/studentRoutes"));
app.use("/api/parents", require("./src/router/parentRoutes"));
app.use("/api/parent-students", require("./src/router/parentStudentRoutes"));
app.use("/api/teachers", require("./src/router/teacherRoutes"));
app.use("/api/teacher-students", require("./src/router/teacherStudentRoutes"));
app.use("/api/counselors", require("./src/router/counselorRoutes"));
app.use(
  "/api/counselor-students",
  require("./src/router/counselorStudentRoutes")
);
app.use("/api/admin", require("./src/router/adminRoutes"));
app.use("/api/categories", require("./src/router/categoryRoutes"));
app.use("/api/subcategories", require("./src/router/subCategoryRoutes"));
app.use("/api/home-page", require("./src/router/homePageRoutes"));
app.use("/api/careers", require("./src/router/careerRoutes"));
app.use("/api/career-roadmaps", require("./src/router/careerRoadmapRoutes"));
app.use("/api/eleventh-groups", require("./src/router/eleventhGroupRoutes"));
app.use("/api/diploma-courses", require("./src/router/diplomaCourseRoutes"));
app.use("/api/degree-courses", require("./src/router/degreeCourseRoutes"));
app.use("/api/skills", require("./src/router/skillRoutes"));
app.use("/api/skill-roadmaps", require("./src/router/skillRoadmapRoutes"));
app.use("/api/certifications", require("./src/router/certificationRoutes"));
app.use("/api/projects", require("./src/router/projectRoutes"));
app.use("/api/government-exams", require("./src/router/governmentExamRoutes"));
app.use(
  "/api/exam-eligibilities",
  require("./src/router/examEligibilityRoutes")
);
app.use("/api/exam-syllabus", require("./src/router/examSyllabusRoutes"));
app.use("/api/colleges", require("./src/router/collegeRoutes"));
app.use("/api/college-courses", require("./src/router/collegeCourseRoutes"));
app.use("/api/college-reviews", require("./src/router/collegeReviewRoutes"));
app.use(
  "/api/college-comparisons",
  require("./src/router/collegeComparisonRoutes")
);
app.use(
  "/api/resource-categories",
  require("./src/router/resourceCategoryRoutes")
);
app.use("/api/resources", require("./src/router/resourceRoutes"));
app.use(
  "/api/assessment-categories",
  require("./src/router/assessmentCategoryRoutes")
);
app.use("/api/assessments", require("./src/router/assessmentRoutes"));
app.use(
  "/api/assessment-questions",
  require("./src/router/assessmentQuestionRoutes")
);
app.use(
  "/api/assessment-attempts",
  require("./src/router/assessmentAttemptRoutes")
);
app.use(
  "/api/assessment-results",
  require("./src/router/assessmentResultRoutes")
);
app.use(
  "/api/ai-recommendations",
  require("./src/router/aiRecommendationRoutes")
);
app.use("/api/ai-conversations", require("./src/router/aiConversationRoutes"));
app.use("/api/ai-support", require("./src/router/aiSupportRoutes"));
app.use("/api/ai-replace", require("./src/router/aiReplaceRoutes"));
app.use("/api/student-progress", require("./src/router/studentProgressRoutes"));
app.use("/api/saved-careers", require("./src/router/savedCareerRoutes"));
app.use("/api/notifications", require("./src/router/notificationRoutes"));
app.use("/api/subjects", require("./src/router/subjectRoutes"));
app.use("/api/group-subjects", require("./src/router/groupSubjectRoutes"));
app.use("/api/education-paths", require("./src/router/educationPathRoutes"));
app.use(
  "/api/career-eligibilities",
  require("./src/router/careerEligibilityRoutes")
);
app.use("/api/career-skills", require("./src/router/careerSkillRoutes"));
app.use(
  "/api/student-interests",
  require("./src/router/studentInterestRoutes")
);
app.use(
  "/api/career-recommendations",
  require("./src/router/careerRecommendationRoutes")
);
app.use(
  "/api/college-admissions",
  require("./src/router/collegeAdmissionRoutes")
);
app.use(
  "/api/college-year-roadmaps",
  require("./src/router/collegeYearRoadmapRoutes")
);
app.use(
  "/api/student-course-progress",
  require("./src/router/studentCourseProgressRoutes")
);
app.use(
  "/api/student-roadmap-progress",
  require("./src/router/studentRoadmapProgressRoutes")
);
app.use("/api/departments", require("./src/router/departmentRoutes"));
app.use("/api", require("./src/router/courseVideoRoutes"));
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Connect DB
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
