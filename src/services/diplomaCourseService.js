const DiplomaCourse = require("../model/core/diplomaCourseModel");

const getAllDiplomaCourses = async (query = {}) => {
  const filter = {};
  if (query.isActive !== undefined) {
    filter.isActive = query.isActive === "true" || query.isActive === true;
  }
  return await DiplomaCourse.find(filter)
    .populate({ path: "categoryId", select: "name", strictPopulate: false })
    .sort({ displayOrder: 1, createdAt: -1 });
};

const getActiveDiplomaCourses = async () => {
  return await DiplomaCourse.find({ isActive: true })
    .populate({ path: "categoryId", select: "name", strictPopulate: false })
    .sort({ displayOrder: 1, courseName: 1 });
};

const getDiplomaCourseById = async (id) => {
  return await DiplomaCourse.findById(id).populate({
    path: "categoryId",
    select: "name",
    strictPopulate: false
  });
};

const createDiplomaCourse = async (data) => {
  return await DiplomaCourse.create(data);
};

module.exports = {
  getAllDiplomaCourses,
  getActiveDiplomaCourses,
  getDiplomaCourseById,
  createDiplomaCourse
};
