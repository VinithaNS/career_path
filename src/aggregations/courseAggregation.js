const DegreeCourse = require("../model/core/degreeCourseModel");
const DiplomaCourse = require("../model/core/diplomaCourseModel");

const getConsolidatedCourseStats = async () => {
  try {
    const [degreeCount, diplomaCount, degreeDistribution, diplomaStreams] =
      await Promise.all([
        DegreeCourse.countDocuments({ isActive: true }),
        DiplomaCourse.countDocuments({ isActive: true }),
        DegreeCourse.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: "$degreeType", count: { $sum: 1 } } }
        ]),
        DiplomaCourse.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: "$stream", count: { $sum: 1 } } }
        ])
      ]);

    return {
      totalCourses: degreeCount + diplomaCount,
      degrees: {
        total: degreeCount,
        breakdown: degreeDistribution
      },
      diplomas: {
        total: diplomaCount,
        breakdown: diplomaStreams
      }
    };
  } catch (error) {
    throw new Error(`Aggregation failed: ${error.message}`);
  }
};

module.exports = {
  getConsolidatedCourseStats
};
