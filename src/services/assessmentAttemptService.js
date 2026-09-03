const AssessmentAttempt = require("../model/assessmentAttemptModel");

const Assessment = require("../model/assessmentModel");

const AssessmentQuestion = require("../model/assessmentQuestionModel");

const Student = require("../model/studentModel");

// =====================================================
// START ASSESSMENT
// =====================================================

const startAssessment = async (studentId, assessmentId) => {
  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  const assessment = await Assessment.findById(assessmentId);

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  if (!assessment.isActive) {
    throw new Error("Assessment is not active");
  }

  if (!assessment.isPublished) {
    throw new Error("Assessment is not published");
  }

  const existingAttempt = await AssessmentAttempt.findOne({
    student: studentId,
    assessment: assessmentId,
    status: "InProgress"
  });

  if (existingAttempt) {
    return await AssessmentAttempt.findById(existingAttempt._id)
      .populate("student")
      .populate("assessment");
  }

  const questions = await AssessmentQuestion.find({
    assessment: assessmentId,
    isActive: true
  });

  if (questions.length === 0) {
    throw new Error("No questions available for this assessment");
  }

  const attempt = await AssessmentAttempt.create({
    student: studentId,
    assessment: assessmentId,
    startedAt: new Date(),
    status: "InProgress",
    totalQuestions: questions.length,
    totalMarks: questions.reduce((total, question) => total + question.marks, 0)
  });

  return await AssessmentAttempt.findById(attempt._id)
    .populate("student")
    .populate("assessment");
};

// =====================================================
// GET ATTEMPT BY ID
// =====================================================

const getAttemptById = async (attemptId) => {
  try {
    const attempt = await AssessmentAttempt.findById(attemptId)
      .populate("student")
      .populate("assessment")
      .populate("answers.question");

    if (!attempt) {
      throw new Error("Assessment attempt not found");
    }

    return attempt;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET STUDENT ATTEMPTS
// =====================================================

const getStudentAttempts = async (studentId) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const attempts = await AssessmentAttempt.find({
      student: studentId
    })
      .populate("assessment")
      .sort({
        createdAt: -1
      });

    return attempts;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ASSESSMENT ATTEMPTS
// =====================================================

const getAssessmentAttempts = async (assessmentId) => {
  try {
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    const attempts = await AssessmentAttempt.find({
      assessment: assessmentId
    })
      .populate("student")
      .sort({
        createdAt: -1
      });

    return attempts;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SUBMIT ANSWER
// =====================================================

const submitAnswer = async (attemptId, questionId, selectedAnswer) => {
  try {
    const attempt = await AssessmentAttempt.findById(attemptId);

    if (!attempt) {
      throw new Error("Assessment attempt not found");
    }

    if (attempt.status !== "InProgress") {
      throw new Error("Assessment attempt is already completed");
    }

    const question = await AssessmentQuestion.findById(questionId);

    if (!question) {
      throw new Error("Assessment question not found");
    }

    // Make sure question belongs to assessment
    if (question.assessment.toString() !== attempt.assessment.toString()) {
      throw new Error("Question does not belong to this assessment");
    }

    const isCorrect = question.correctAnswer === selectedAnswer;

    const marksObtained = isCorrect ? question.marks : 0;

    // Check whether already answered
    const existingAnswerIndex = attempt.answers.findIndex(
      (answer) => answer.question.toString() === questionId.toString()
    );

    if (existingAnswerIndex !== -1) {
      attempt.answers[existingAnswerIndex].selectedAnswer = selectedAnswer;

      attempt.answers[existingAnswerIndex].isCorrect = isCorrect;

      attempt.answers[existingAnswerIndex].marksObtained = marksObtained;
    } else {
      attempt.answers.push({
        question: questionId,
        selectedAnswer,
        isCorrect,
        marksObtained
      });
    }

    // Recalculate statistics
    attempt.answeredQuestions = attempt.answers.length;

    attempt.correctAnswers = attempt.answers.filter(
      (answer) => answer.isCorrect
    ).length;

    attempt.wrongAnswers = attempt.answers.filter(
      (answer) => !answer.isCorrect
    ).length;

    attempt.skippedQuestions = Math.max(
      attempt.totalQuestions - attempt.answeredQuestions,
      0
    );

    attempt.obtainedMarks = attempt.answers.reduce(
      (total, answer) => total + answer.marksObtained,
      0
    );

    await attempt.save();

    return await AssessmentAttempt.findById(attemptId)
      .populate("assessment")
      .populate("answers.question");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// COMPLETE ATTEMPT
// =====================================================

const completeAttempt = async (attemptId) => {
  try {
    const attempt = await AssessmentAttempt.findById(attemptId);

    if (!attempt) {
      throw new Error("Assessment attempt not found");
    }

    if (attempt.status === "Completed") {
      throw new Error("Assessment attempt already completed");
    }

    const submittedAt = new Date();

    // Calculate time in seconds
    const timeTaken = Math.floor((submittedAt - attempt.startedAt) / 1000);

    attempt.submittedAt = submittedAt;

    attempt.status = "Completed";

    attempt.timeTaken = timeTaken;

    attempt.answeredQuestions = attempt.answers.length;

    attempt.correctAnswers = attempt.answers.filter(
      (answer) => answer.isCorrect
    ).length;

    attempt.wrongAnswers = attempt.answers.filter(
      (answer) => !answer.isCorrect
    ).length;

    attempt.skippedQuestions = Math.max(
      attempt.totalQuestions - attempt.answeredQuestions,
      0
    );

    attempt.obtainedMarks = attempt.answers.reduce(
      (total, answer) => total + answer.marksObtained,
      0
    );

    if (attempt.totalMarks > 0) {
      attempt.percentage = Number(
        ((attempt.obtainedMarks / attempt.totalMarks) * 100).toFixed(2)
      );
    } else {
      attempt.percentage = 0;
    }

    await attempt.save();

    return await AssessmentAttempt.findById(attemptId)
      .populate("student")
      .populate("assessment")
      .populate("answers.question");
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// ABANDON ATTEMPT
// =====================================================

const abandonAttempt = async (attemptId) => {
  try {
    const attempt = await AssessmentAttempt.findById(attemptId);

    if (!attempt) {
      throw new Error("Assessment attempt not found");
    }

    if (attempt.status === "Completed") {
      throw new Error("Completed assessment cannot be abandoned");
    }

    attempt.status = "Abandoned";

    attempt.submittedAt = new Date();

    await attempt.save();

    return attempt;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  startAssessment,
  getAttemptById,
  getStudentAttempts,
  getAssessmentAttempts,
  submitAnswer,
  completeAttempt,
  abandonAttempt
};
