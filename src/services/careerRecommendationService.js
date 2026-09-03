const StudentInterest = require("../model/studentInterestModel");

const CareerEligibility = require("../model/careerEligibilityModel.js");

const CareerSkill = require("../model/careerSkillModel.js");

const CareerRecommendation = require("../model/careerRecommendationModel.js");

// Generate recommendations
exports.generateRecommendations = async (studentId) => {
  // ----------------------------------------
  // 1. Get student interests
  // ----------------------------------------

  const studentInterest = await StudentInterest.findOne({
    student: studentId,
    isActive: true
  }).populate("preferredSubjects");

  if (!studentInterest) {
    throw new Error("Student interests not found");
  }

  // ----------------------------------------
  // 2. Get eligible careers
  // ----------------------------------------

  const eligibilityRecords = await CareerEligibility.find({
    isActive: true
  }).populate("career");

  const recommendations = [];

  // ----------------------------------------
  // 3. Calculate career score
  // ----------------------------------------

  for (const eligibility of eligibilityRecords) {
    let score = 0;

    const matchedInterests = [];
    const matchedSubjects = [];

    // --------------------------------------
    // Interest category matching
    // --------------------------------------

    const careerCategory =
      eligibility.career?.category ||
      eligibility.career?.domain ||
      eligibility.career?.sector ||
      "";

    for (const interest of studentInterest.interests || []) {
      if (
        careerCategory &&
        interest.category &&
        careerCategory.toLowerCase().includes(interest.category.toLowerCase())
      ) {
        score += Math.min(interest.score || 50, 20);

        matchedInterests.push(interest.name);
      }
    }

    // --------------------------------------
    // Subject matching
    // --------------------------------------

    const requiredSubjects = eligibility.requiredSubjects || [];

    const preferredSubjectIds = (studentInterest.preferredSubjects || []).map(
      (subject) => subject._id.toString()
    );

    for (const subject of requiredSubjects) {
      if (preferredSubjectIds.includes(subject.toString())) {
        score += 10;

        matchedSubjects.push(subject);
      }
    }

    // --------------------------------------
    // Eligibility bonus
    // --------------------------------------

    if (eligibility.eleventhGroup) {
      score += 20;
    }

    // --------------------------------------
    // Maximum score
    // --------------------------------------

    score = Math.min(score, 100);

    if (score > 0) {
      recommendations.push({
        student: studentId,
        career: eligibility.career._id,
        score,
        matchPercentage: score,
        matchedInterests,
        matchedSubjects,
        recommendationReason: `Recommended based on your education, interests and subject preferences.`,
        source: "Rule Based"
      });
    }
  }

  // ----------------------------------------
  // 4. Sort
  // ----------------------------------------

  recommendations.sort((a, b) => b.score - a.score);

  // ----------------------------------------
  // 5. Add rank
  // ----------------------------------------

  recommendations.forEach((item, index) => {
    item.rank = index + 1;
  });

  // ----------------------------------------
  // 6. Remove old recommendations
  // ----------------------------------------

  await CareerRecommendation.deleteMany({
    student: studentId
  });

  // ----------------------------------------
  // 7. Save new recommendations
  // ----------------------------------------

  if (recommendations.length > 0) {
    await CareerRecommendation.insertMany(recommendations);
  }

  return recommendations;
};
