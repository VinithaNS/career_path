const AssessmentResult = require("../model/assessmentResultModel");

const AssessmentAttempt = require("../model/assessmentAttemptModel");

const Assessment = require("../model/assessmentModel");

const Student = require("../model/studentModel");

// =====================================================
// CREATE RESULT FROM COMPLETED ATTEMPT
// =====================================================

const createAssessmentResult = async (attemptId) => {
  try {
    // -------------------------------------------------
    // Find Attempt
    // -------------------------------------------------

    const attempt = await AssessmentAttempt.findById(attemptId);

    if (!attempt) {
      throw new Error("Assessment attempt not found");
    }

    // -------------------------------------------------
    // Attempt must be completed
    // -------------------------------------------------

    if (attempt.status !== "Completed") {
      throw new Error("Assessment attempt is not completed");
    }

    // -------------------------------------------------
    // Check Student
    // -------------------------------------------------

    const student = await Student.findById(attempt.student);

    if (!student) {
      throw new Error("Student not found");
    }

    // -------------------------------------------------
    // Check Assessment
    // -------------------------------------------------

    const assessment = await Assessment.findById(attempt.assessment);

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    // -------------------------------------------------
    // Check Existing Result
    // -------------------------------------------------

    const existingResult = await AssessmentResult.findOne({
      attempt: attemptId
    });

    if (existingResult) {
      return await AssessmentResult.findById(existingResult._id)
        .populate("student")
        .populate("assessment")
        .populate("attempt");
    }

    // -------------------------------------------------
    // Calculate Result
    // -------------------------------------------------

    const percentage =
      attempt.totalMarks > 0
        ? Number(
            ((attempt.obtainedMarks / attempt.totalMarks) * 100).toFixed(2)
          )
        : 0;

    // -------------------------------------------------
    // Passing Score
    // -------------------------------------------------

    const passingScore = assessment.passingScore || 0;

    // -------------------------------------------------
    // Result Status
    // -------------------------------------------------

    const resultStatus = percentage >= passingScore ? "Passed" : "Failed";

    // -------------------------------------------------
    // Create Result
    // -------------------------------------------------

    const result = await AssessmentResult.create({
      student: attempt.student,

      assessment: attempt.assessment,

      attempt: attempt._id,

      totalQuestions: attempt.totalQuestions,

      answeredQuestions: attempt.answeredQuestions,

      correctAnswers: attempt.correctAnswers,

      wrongAnswers: attempt.wrongAnswers,

      skippedQuestions: attempt.skippedQuestions,

      totalMarks: attempt.totalMarks,

      obtainedMarks: attempt.obtainedMarks,

      percentage,

      passingScore,

      resultStatus,

      completedAt: attempt.submittedAt || new Date()
    });

    return await AssessmentResult.findById(result._id)
      .populate("student")
      .populate("assessment")
      .populate("attempt");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET RESULT BY ID
// =====================================================

const getAssessmentResultById = async (resultId) => {
  try {
    const result = await AssessmentResult.findById(resultId)
      .populate("student")
      .populate("assessment")
      .populate("attempt");

    if (!result) {
      throw new Error("Assessment result not found");
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET RESULTS BY STUDENT
// =====================================================

const getStudentResults = async (studentId) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const results = await AssessmentResult.find({
      student: studentId
    })
      .populate("assessment")
      .sort({
        completedAt: -1
      });

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET RESULTS BY ASSESSMENT
// =====================================================

const getAssessmentResults = async (assessmentId) => {
  try {
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    const results = await AssessmentResult.find({
      assessment: assessmentId
    })
      .populate("student")
      .sort({
        percentage: -1
      });

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET STUDENT LATEST RESULT
// =====================================================

const getLatestStudentResult = async (studentId) => {
  try {
    const result = await AssessmentResult.findOne({
      student: studentId
    })
      .populate("assessment")
      .sort({
        completedAt: -1
      });

    if (!result) {
      throw new Error("No assessment result found for this student");
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAssessmentResult,
  getAssessmentResultById,
  getStudentResults,
  getAssessmentResults,
  getLatestStudentResult
};
