const HomePage = require("../model/homePage");

// CREATE HOME PAGE
const createHomePage = async (data) => {
  const existingHomePage = await HomePage.findOne({
    isActive: true
  });

  if (existingHomePage) {
    throw new Error("Active home page already exists");
  }

  const homePage = await HomePage.create(data);

  return homePage;
};

// GET HOME PAGE
const getHomePage = async () => {
  const homePage = await HomePage.findOne({
    isActive: true
  }).populate("categories");
  // .populate("featuredCareers")
  // .populate("featuredCourses")
  // .populate("featuredColleges");

  if (!homePage) {
    throw new Error("Home page not found");
  }

  return homePage;
};

// GET HOME PAGE BY ID
const getHomePageById = async (homePageId) => {
  const homePage = await HomePage.findById(homePageId).populate("categories");
  // .populate("featuredCareers")
  // .populate("featuredCourses")
  // .populate("featuredColleges");

  if (!homePage) {
    throw new Error("Home page not found");
  }

  return homePage;
};

// UPDATE HOME PAGE
const updateHomePage = async (homePageId, data) => {
  const homePage = await HomePage.findByIdAndUpdate(
    homePageId,
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  )
    .populate("categories")
    .populate("featuredCareers")
    .populate("featuredCourses")
    .populate("featuredColleges");

  if (!homePage) {
    throw new Error("Home page not found");
  }

  return homePage;
};

// DELETE HOME PAGE
const deleteHomePage = async (homePageId) => {
  const homePage = await HomePage.findByIdAndDelete(homePageId);

  if (!homePage) {
    throw new Error("Home page not found");
  }

  return homePage;
};

module.exports = {
  createHomePage,
  getHomePage,
  getHomePageById,
  updateHomePage,
  deleteHomePage
};
