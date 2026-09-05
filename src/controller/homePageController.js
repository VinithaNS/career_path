const Career = require("../model/careerModel");
const College = require("../model/collegeModel");
const GovernmentExam = require("../model/governmentExamModel");

const getHomeData = async (req, res) => {
  try {
    const [careerCount, collegeCount, examCount] = await Promise.all([
      Career.countDocuments(),
      College.countDocuments(),
      GovernmentExam.countDocuments()
    ]);

    const careers = await Career.find({});

    res.status(200).json({
      success: true,
      data: {
        stats: {
          careers: careerCount,
          colleges: collegeCount,
          exams: examCount
        },
        careers
      }
    });
  } catch (error) {
    console.error("Home API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load home page data"
    });
  }
};

module.exports = {
  getHomeData
};
