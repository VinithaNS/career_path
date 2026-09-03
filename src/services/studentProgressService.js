const StudentProgress = require("../model/studentProgressModel");

const Student = require("../model/studentModel");

const Career = require("../model/careerModel");

const AssessmentAttempt = require("../model/assessmentAttemptModel");

const AssessmentResult = require("../model/assessmentResultModel");

const CareerRoadmap = require("../model/careerRoadmapModel");

// =====================================================
// CREATE STUDENT PROGRESS
// =====================================================

const createStudentProgress = async (data) => {
  try {
    const {
      student,
      selectedCareer,
      assessmentCompleted,
      assessmentAttempt,
      assessmentResult,
      roadmap,
      roadmapProgress,
      coursesStarted,
      coursesCompleted,
      projectsStarted,
      projectsCompleted,
      certificationsCompleted,
      skillsCompleted,
      skillsInProgress,
      overallProgress,
      currentStage,
      lastActivity,
      status
    } = data;

    // ================================================
    // VALIDATE STUDENT
    // ================================================

    if (!student) {
      throw new Error("Student is required");
    }

    const studentExists = await Student.findById(student);

    if (!studentExists) {
      throw new Error("Student not found");
    }

    // ================================================
    // CHECK EXISTING PROGRESS
    // ================================================

    const existingProgress = await StudentProgress.findOne({
      student
    });

    if (existingProgress) {
      throw new Error("Student progress already exists");
    }

    // ================================================
    // VALIDATE CAREER
    // ================================================

    if (selectedCareer) {
      const careerExists = await Career.findById(selectedCareer);

      if (!careerExists) {
        throw new Error("Selected career not found");
      }
    }

    // ================================================
    // VALIDATE ASSESSMENT ATTEMPT
    // ================================================

    if (assessmentAttempt) {
      const attemptExists = await AssessmentAttempt.findById(assessmentAttempt);

      if (!attemptExists) {
        throw new Error("Assessment attempt not found");
      }
    }

    // ================================================
    // VALIDATE ASSESSMENT RESULT
    // ================================================

    if (assessmentResult) {
      const resultExists = await AssessmentResult.findById(assessmentResult);

      if (!resultExists) {
        throw new Error("Assessment result not found");
      }
    }

    // ================================================
    // VALIDATE ROADMAP
    // ================================================

    if (roadmap) {
      const roadmapExists = await CareerRoadmap.findById(roadmap);

      if (!roadmapExists) {
        throw new Error("Career roadmap not found");
      }
    }

    // ================================================
    // CREATE PROGRESS
    // ================================================

    const progress = await StudentProgress.create({
      student,

      selectedCareer: selectedCareer || null,

      assessmentCompleted: assessmentCompleted || false,

      assessmentAttempt: assessmentAttempt || null,

      assessmentResult: assessmentResult || null,

      roadmap: roadmap || null,

      roadmapProgress: roadmapProgress || 0,

      coursesStarted: coursesStarted || 0,

      coursesCompleted: coursesCompleted || 0,

      projectsStarted: projectsStarted || 0,

      projectsCompleted: projectsCompleted || 0,

      certificationsCompleted: certificationsCompleted || 0,

      skillsCompleted: skillsCompleted || [],

      skillsInProgress: skillsInProgress || [],

      overallProgress: overallProgress || 0,

      currentStage: currentStage || "Not Started",

      lastActivity: lastActivity || "",

      lastActivityDate: new Date(),

      status: status || "Active"
    });

    return await StudentProgress.findById(progress._id)
      .populate("student")
      .populate("selectedCareer")
      .populate("assessmentAttempt")
      .populate("assessmentResult")
      .populate("roadmap");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL STUDENT PROGRESS
// =====================================================

const getAllStudentProgress = async () => {
  try {
    const progress = await StudentProgress.find()
      .populate("student")
      .populate("selectedCareer")
      .populate("assessmentAttempt")
      .populate("assessmentResult")
      .populate("roadmap")
      .sort({
        createdAt: -1
      });

    return progress;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET PROGRESS BY ID
// =====================================================

const getStudentProgressById = async (id) => {
  try {
    const progress = await StudentProgress.findById(id)
      .populate("student")
      .populate("selectedCareer")
      .populate("assessmentAttempt")
      .populate("assessmentResult")
      .populate("roadmap");

    if (!progress) {
      throw new Error("Student progress not found");
    }

    return progress;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET PROGRESS BY STUDENT
// =====================================================

const getProgressByStudent = async (studentId) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const progress = await StudentProgress.findOne({
      student: studentId
    })
      .populate("student")
      .populate("selectedCareer")
      .populate("assessmentAttempt")
      .populate("assessmentResult")
      .populate("roadmap");

    if (!progress) {
      throw new Error("Progress not found for this student");
    }

    return progress;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE STUDENT PROGRESS
// =====================================================

const updateStudentProgress = async (id, data) => {
  try {
    const progress = await StudentProgress.findById(id);

    if (!progress) {
      throw new Error("Student progress not found");
    }

    const updatedProgress = await StudentProgress.findByIdAndUpdate(
      id,
      {
        ...data,
        lastActivityDate: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate("student")
      .populate("selectedCareer")
      .populate("assessmentAttempt")
      .populate("assessmentResult")
      .populate("roadmap");

    return updatedProgress;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE OVERALL PROGRESS
// =====================================================

const updateOverallProgress = async (id, overallProgress, lastActivity) => {
  try {
    if (
      overallProgress === undefined ||
      overallProgress < 0 ||
      overallProgress > 100
    ) {
      throw new Error("Overall progress must be between 0 and 100");
    }

    const progress = await StudentProgress.findById(id);

    if (!progress) {
      throw new Error("Student progress not found");
    }

    progress.overallProgress = overallProgress;

    if (lastActivity) {
      progress.lastActivity = lastActivity;
    }

    progress.lastActivityDate = new Date();

    // Automatically mark completed
    if (overallProgress === 100) {
      progress.status = "Completed";

      progress.currentStage = "Completed";
    }

    await progress.save();

    return await StudentProgress.findById(id)
      .populate("student")
      .populate("selectedCareer")
      .populate("roadmap");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE ROADMAP PROGRESS
// =====================================================

const updateRoadmapProgress = async (id, roadmapProgress) => {
  try {
    if (
      roadmapProgress === undefined ||
      roadmapProgress < 0 ||
      roadmapProgress > 100
    ) {
      throw new Error("Roadmap progress must be between 0 and 100");
    }

    const progress = await StudentProgress.findById(id);

    if (!progress) {
      throw new Error("Student progress not found");
    }

    progress.roadmapProgress = roadmapProgress;

    progress.lastActivityDate = new Date();

    await progress.save();

    return progress;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE CURRENT STAGE
// =====================================================

const updateCurrentStage = async (id, currentStage) => {
  try {
    const validStages = [
      "Not Started",
      "Assessment",
      "Career Selection",
      "Roadmap",
      "Learning",
      "Projects",
      "Certification",
      "Completed"
    ];

    if (!validStages.includes(currentStage)) {
      throw new Error("Invalid current stage");
    }

    const progress = await StudentProgress.findById(id);

    if (!progress) {
      throw new Error("Student progress not found");
    }

    progress.currentStage = currentStage;

    progress.lastActivityDate = new Date();

    if (currentStage === "Completed") {
      progress.status = "Completed";
    }

    await progress.save();

    return progress;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE STUDENT PROGRESS
// =====================================================

const deleteStudentProgress = async (id) => {
  try {
    const progress = await StudentProgress.findById(id);

    if (!progress) {
      throw new Error("Student progress not found");
    }

    await StudentProgress.findByIdAndDelete(id);

    return {
      message: "Student progress deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createStudentProgress,
  getAllStudentProgress,
  getStudentProgressById,
  getProgressByStudent,
  updateStudentProgress,
  updateOverallProgress,
  updateRoadmapProgress,
  updateCurrentStage,
  deleteStudentProgress
};
