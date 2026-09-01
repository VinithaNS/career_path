const SavedCareer = require("../model/savedCareerModel");

const Student = require("../model/studentModel");

const Career = require("../model/careerModel");

// =====================================================
// SAVE CAREER
// =====================================================

const saveCareer = async (data) => {
  try {
    const { student, career, notes } = data;

    // ================================================
    // VALIDATION
    // ================================================

    if (!student) {
      throw new Error("Student is required");
    }

    if (!career) {
      throw new Error("Career is required");
    }

    // ================================================
    // CHECK STUDENT
    // ================================================

    const studentExists = await Student.findById(student);

    if (!studentExists) {
      throw new Error("Student not found");
    }

    // ================================================
    // CHECK CAREER
    // ================================================

    const careerExists = await Career.findById(career);

    if (!careerExists) {
      throw new Error("Career not found");
    }

    // ================================================
    // CHECK DUPLICATE
    // ================================================

    const existingSavedCareer = await SavedCareer.findOne({
      student,
      career
    });

    if (existingSavedCareer) {
      if (!existingSavedCareer.isActive) {
        existingSavedCareer.isActive = true;

        existingSavedCareer.notes = notes || "";

        await existingSavedCareer.save();

        return await SavedCareer.findById(existingSavedCareer._id)
          .populate("student")
          .populate("career");
      }

      throw new Error("Career already saved");
    }

    // ================================================
    // CREATE
    // ================================================

    const savedCareer = await SavedCareer.create({
      student,
      career,
      notes: notes || "",
      isActive: true
    });

    // ================================================
    // RETURN POPULATED DATA
    // ================================================

    return await SavedCareer.findById(savedCareer._id)
      .populate("student")
      .populate("career");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL SAVED CAREERS
// =====================================================

const getAllSavedCareers = async () => {
  try {
    const savedCareers = await SavedCareer.find({
      isActive: true
    })
      .populate("student")
      .populate("career")
      .sort({
        createdAt: -1
      });

    return savedCareers;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET SAVED CAREER BY ID
// =====================================================

const getSavedCareerById = async (id) => {
  try {
    const savedCareer = await SavedCareer.findOne({
      _id: id,
      isActive: true
    })
      .populate("student")
      .populate("career");

    if (!savedCareer) {
      throw new Error("Saved career not found");
    }

    return savedCareer;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET SAVED CAREERS BY STUDENT
// =====================================================

const getSavedCareersByStudent = async (studentId) => {
  try {
    // ================================================
    // CHECK STUDENT
    // ================================================

    const studentExists = await Student.findById(studentId);

    if (!studentExists) {
      throw new Error("Student not found");
    }

    // ================================================
    // GET SAVED CAREERS
    // ================================================

    const savedCareers = await SavedCareer.find({
      student: studentId,
      isActive: true
    })
      .populate("career")
      .sort({
        createdAt: -1
      });

    return savedCareers;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// CHECK WHETHER CAREER IS SAVED
// =====================================================

const checkSavedCareer = async (studentId, careerId) => {
  try {
    const savedCareer = await SavedCareer.findOne({
      student: studentId,
      career: careerId,
      isActive: true
    });

    return {
      isSaved: !!savedCareer,
      data: savedCareer
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE SAVED CAREER
// =====================================================

const updateSavedCareer = async (id, data) => {
  try {
    const savedCareer = await SavedCareer.findOne({
      _id: id,
      isActive: true
    });

    if (!savedCareer) {
      throw new Error("Saved career not found");
    }

    const updated = await SavedCareer.findByIdAndUpdate(
      id,
      {
        notes: data.notes || ""
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate("student")
      .populate("career");

    return updated;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// REMOVE SAVED CAREER
// =====================================================

const removeSavedCareer = async (id) => {
  try {
    const savedCareer = await SavedCareer.findOne({
      _id: id,
      isActive: true
    });

    if (!savedCareer) {
      throw new Error("Saved career not found");
    }

    // ================================================
    // SOFT DELETE
    // ================================================

    savedCareer.isActive = false;

    await savedCareer.save();

    return {
      message: "Career removed from saved careers successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// REMOVE CAREER DIRECTLY FOR STUDENT
// =====================================================

const removeCareerForStudent = async (studentId, careerId) => {
  try {
    const savedCareer = await SavedCareer.findOne({
      student: studentId,
      career: careerId,
      isActive: true
    });

    if (!savedCareer) {
      throw new Error("Saved career not found");
    }

    savedCareer.isActive = false;

    await savedCareer.save();

    return {
      message: "Career removed from saved careers successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveCareer,
  getAllSavedCareers,
  getSavedCareerById,
  getSavedCareersByStudent,
  checkSavedCareer,
  updateSavedCareer,
  removeSavedCareer,
  removeCareerForStudent
};
