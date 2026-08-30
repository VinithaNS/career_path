const ExamSyllabus = require("../model/examSyllabusModel");

// =====================================================
// CREATE EXAM SYLLABUS
// =====================================================

const createExamSyllabus = async (data) => {
  try {
    const syllabus = await ExamSyllabus.create(data);

    return syllabus;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL EXAM SYLLABUS
// =====================================================

const getAllExamSyllabus = async () => {
  try {
    const syllabus = await ExamSyllabus.find()
      .populate("governmentExam")
      .sort({ displayOrder: 1 });

    return syllabus;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE EXAM SYLLABUS
// =====================================================

const getActiveExamSyllabus = async () => {
  try {
    const syllabus = await ExamSyllabus.find({
      isActive: true
    })
      .populate("governmentExam")
      .sort({ displayOrder: 1 });

    return syllabus;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET SYLLABUS BY ID
// =====================================================

const getExamSyllabusById = async (id) => {
  try {
    const syllabus = await ExamSyllabus.findById(id).populate("governmentExam");

    if (!syllabus) {
      throw new Error("Exam syllabus not found");
    }

    return syllabus;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET SYLLABUS BY GOVERNMENT EXAM
// =====================================================

const getSyllabusByExam = async (examId) => {
  try {
    const syllabus = await ExamSyllabus.find({
      governmentExam: examId,
      isActive: true
    })
      .populate("governmentExam")
      .sort({ displayOrder: 1 });

    return syllabus;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE EXAM SYLLABUS
// =====================================================

const updateExamSyllabus = async (id, data) => {
  try {
    const existingSyllabus = await ExamSyllabus.findById(id);

    if (!existingSyllabus) {
      throw new Error("Exam syllabus not found");
    }

    const updatedSyllabus = await ExamSyllabus.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("governmentExam");

    return updatedSyllabus;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE EXAM SYLLABUS
// =====================================================

const deleteExamSyllabus = async (id) => {
  try {
    const syllabus = await ExamSyllabus.findById(id);

    if (!syllabus) {
      throw new Error("Exam syllabus not found");
    }

    await ExamSyllabus.findByIdAndDelete(id);

    return {
      message: "Exam syllabus deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createExamSyllabus,
  getAllExamSyllabus,
  getActiveExamSyllabus,
  getExamSyllabusById,
  getSyllabusByExam,
  updateExamSyllabus,
  deleteExamSyllabus
};
