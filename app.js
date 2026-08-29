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
