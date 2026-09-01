const AIReplace = require("../model/AIReplaceModel");

// =====================================================
// CREATE AI REPLACE
// =====================================================

const createAIReplace = async (data) => {
  try {
    const {
      sector,
      domain,
      humanRole,
      jobDescription,
      aiTechnology,
      aiCapability,
      replacementPercentage,
      automationLevel,
      replacementType,
      currentDemand,
      futureDemand,
      jobsAtRisk,
      newJobsCreated,
      requiredSkills,
      explanation,
      benefits,
      risks
    } = data;

    // ================================================
    // VALIDATION
    // ================================================

    if (
      !sector ||
      !domain ||
      !humanRole ||
      !jobDescription ||
      !aiTechnology ||
      !aiCapability ||
      replacementPercentage === undefined ||
      !automationLevel ||
      !replacementType ||
      !explanation
    ) {
      throw new Error("Required AI replacement fields are missing");
    }

    // ================================================
    // DUPLICATE CHECK
    // ================================================

    const existing = await AIReplace.findOne({
      sector,
      domain,
      humanRole,
      aiTechnology
    });

    if (existing) {
      throw new Error(
        "AI replacement record already exists for this human role"
      );
    }

    // ================================================
    // CREATE
    // ================================================

    const aiReplace = await AIReplace.create({
      sector,
      domain,
      humanRole,
      jobDescription,
      aiTechnology,
      aiCapability,
      replacementPercentage,
      automationLevel,
      replacementType,
      currentDemand: currentDemand || "Medium",
      futureDemand: futureDemand || "Medium",
      jobsAtRisk: jobsAtRisk || [],
      newJobsCreated: newJobsCreated || [],
      requiredSkills: requiredSkills || [],
      explanation,
      benefits: benefits || [],
      risks: risks || [],
      isActive: true
    });

    return aiReplace;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL AI REPLACE RECORDS
// =====================================================

const getAllAIReplacements = async () => {
  try {
    const records = await AIReplace.find({
      isActive: true
    }).sort({
      createdAt: -1
    });

    return records;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET AI REPLACE BY ID
// =====================================================

const getAIReplaceById = async (id) => {
  try {
    const record = await AIReplace.findById(id);

    if (!record) {
      throw new Error("AI replacement record not found");
    }

    return record;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET BY SECTOR
// =====================================================

const getBySector = async (sector) => {
  try {
    const records = await AIReplace.find({
      sector: {
        $regex: sector,
        $options: "i"
      },
      isActive: true
    }).sort({
      replacementPercentage: -1
    });

    return records;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET BY DOMAIN
// =====================================================

const getByDomain = async (domain) => {
  try {
    const records = await AIReplace.find({
      domain: {
        $regex: domain,
        $options: "i"
      },
      isActive: true
    }).sort({
      replacementPercentage: -1
    });

    return records;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET HIGH AUTOMATION JOBS
// =====================================================

const getHighAutomationJobs = async () => {
  try {
    const records = await AIReplace.find({
      automationLevel: {
        $in: ["High", "Very High"]
      },
      isActive: true
    }).sort({
      replacementPercentage: -1
    });

    return records;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE AI REPLACE
// =====================================================

const updateAIReplace = async (id, data) => {
  try {
    const record = await AIReplace.findById(id);

    if (!record) {
      throw new Error("AI replacement record not found");
    }

    const updated = await AIReplace.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    return updated;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE AI REPLACE
// =====================================================

const deleteAIReplace = async (id) => {
  try {
    const record = await AIReplace.findById(id);

    if (!record) {
      throw new Error("AI replacement record not found");
    }

    // Soft delete
    record.isActive = false;

    await record.save();

    return record;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAIReplace,
  getAllAIReplacements,
  getAIReplaceById,
  getBySector,
  getByDomain,
  getHighAutomationJobs,
  updateAIReplace,
  deleteAIReplace
};
