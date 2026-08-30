const GovernmentExam = require("../model/governmentExamModel");

// =====================================================
// CREATE GOVERNMENT EXAM
// =====================================================

const createGovernmentExam = async (data) => {
  try {
    const existingExam = await GovernmentExam.findOne({
      examCode: data.examCode.toUpperCase()
    });

    if (existingExam) {
      throw new Error("Exam code already exists");
    }

    const exam = await GovernmentExam.create({
      ...data,
      examCode: data.examCode.toUpperCase()
    });

    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL GOVERNMENT EXAMS
// =====================================================

const getAllGovernmentExams = async () => {
  try {
    const exams = await GovernmentExam.find()
      .populate("relatedCareers")
      .populate("relatedSkills");
    //   .sort({ displayOrder: 1 });

    return exams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE GOVERNMENT EXAMS
// =====================================================

const getActiveGovernmentExams = async () => {
  try {
    const exams = await GovernmentExam.find({
      isActive: true
    })
      .populate("relatedCareers")
      .populate("relatedSkills");
    //   .sort({ displayOrder: 1 });

    return exams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET GOVERNMENT EXAM BY ID
// =====================================================

const getGovernmentExamById = async (id) => {
  try {
    const exam = await GovernmentExam.findById(id)
      .populate("relatedCareers")
      .populate("relatedSkills");

    if (!exam) {
      throw new Error("Government exam not found");
    }

    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH GOVERNMENT EXAMS
// =====================================================

const searchGovernmentExams = async (search) => {
  try {
    const exams = await GovernmentExam.find({
      isActive: true,
      $or: [
        {
          examName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          examCode: {
            $regex: search,
            $options: "i"
          }
        },
        {
          conductingAuthority: {
            $regex: search,
            $options: "i"
          }
        },
        {
          examType: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    })
      .populate("relatedCareers")
      .populate("relatedSkills");
    //   .sort({ displayOrder: 1 });

    return exams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET EXAMS BY CAREER
// =====================================================

const getExamsByCareer = async (careerId) => {
  try {
    const exams = await GovernmentExam.find({
      relatedCareers: careerId,
      isActive: true
    })
      .populate("relatedCareers")
      .populate("relatedSkills");
    //   .sort({ displayOrder: 1 });

    return exams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET EXAMS BY SKILL
// =====================================================

const getExamsBySkill = async (skillId) => {
  try {
    const exams = await GovernmentExam.find({
      relatedSkills: skillId,
      isActive: true
    })
      .populate("relatedCareers")
      .populate("relatedSkills");
    //   .sort({ displayOrder: 1 });

    return exams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE GOVERNMENT EXAM
// =====================================================

const updateGovernmentExam = async (id, data) => {
  try {
    const existingExam = await GovernmentExam.findById(id);

    if (!existingExam) {
      throw new Error("Government exam not found");
    }

    if (data.examCode) {
      const duplicateExam = await GovernmentExam.findOne({
        examCode: data.examCode.toUpperCase(),
        _id: {
          $ne: id
        }
      });

      if (duplicateExam) {
        throw new Error("Exam code already exists");
      }

      data.examCode = data.examCode.toUpperCase();
    }

    const updatedExam = await GovernmentExam.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
      .populate("relatedCareers")
      .populate("relatedSkills");

    return updatedExam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE GOVERNMENT EXAM
// =====================================================

const deleteGovernmentExam = async (id) => {
  try {
    const exam = await GovernmentExam.findById(id);

    if (!exam) {
      throw new Error("Government exam not found");
    }

    await GovernmentExam.findByIdAndDelete(id);

    return {
      message: "Government exam deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createGovernmentExam,
  getAllGovernmentExams,
  getActiveGovernmentExams,
  getGovernmentExamById,
  searchGovernmentExams,
  getExamsByCareer,
  getExamsBySkill,
  updateGovernmentExam,
  deleteGovernmentExam
};
