const DiplomaCourse = require("../model/core/diplomaCourseModel");

const getAllDiplomaCourses = async () => {
  return await DiplomaCourse.find({ isActive: true }).sort({ courseName: 1 });
};

const getDiplomaCourseById = async (id) => {
  return await DiplomaCourse.findById(id);
};

const createDiplomaCourse = async (diplomaData) => {
  return await DiplomaCourse.create(diplomaData);
};

module.exports = {
  getAllDiplomaCourses,
  getDiplomaCourseById,
  createDiplomaCourse
};
