const Certification = require("../model/certificationModel");

// =====================================================
// CREATE CERTIFICATION
// =====================================================

const createCertification = async (data) => {
  try {
    const existingCertification = await Certification.findOne({
      certificationCode: data.certificationCode.toUpperCase()
    });

    if (existingCertification) {
      throw new Error("Certification code already exists");
    }

    const certification = await Certification.create({
      ...data,
      certificationCode: data.certificationCode.toUpperCase()
    });

    return certification;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL CERTIFICATIONS
// =====================================================

const getAllCertifications = async () => {
  try {
    const certifications = await Certification.find().populate(
      "skills",
      "skillName skillCode"
    );
    //   .populate("relatedCareers")
    //   .populate("relatedCourses")
    //   .sort({ displayOrder: 1 });

    return certifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE CERTIFICATIONS
// =====================================================

const getActiveCertifications = async () => {
  try {
    const certifications = await Certification.find({
      isActive: true
    }).populate("skills", "skillName skillCode");
    //   .populate("relatedCareers")
    //   .populate("relatedCourses")
    //   .sort({ displayOrder: 1 });

    return certifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET CERTIFICATION BY ID
// =====================================================

const getCertificationById = async (id) => {
  try {
    const certification = await Certification.findById(id).populate(
      "skills",
      "skillName skillCode"
    );
    //   .populate("relatedCareers")
    //   .populate("relatedCourses");

    if (!certification) {
      throw new Error("Certification not found");
    }

    return certification;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH CERTIFICATION
// =====================================================

const searchCertifications = async (search) => {
  try {
    const certifications = await Certification.find({
      isActive: true,
      $or: [
        {
          certificationName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          certificationCode: {
            $regex: search,
            $options: "i"
          }
        },
        {
          provider: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    }).populate("skills", "skillName skillCode");
    //   .populate("relatedCareers")
    //   .sort({ displayOrder: 1 });

    return certifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET CERTIFICATIONS BY SKILL
// =====================================================

const getCertificationsBySkill = async (skillId) => {
  try {
    const certifications = await Certification.find({
      skills: skillId,
      isActive: true
    }).populate("skills", "skillName skillCode");
    //   .populate("relatedCareers")
    //   .sort({ displayOrder: 1 });

    return certifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE CERTIFICATION
// =====================================================

const updateCertification = async (id, data) => {
  try {
    const existingCertification = await Certification.findById(id);

    if (!existingCertification) {
      throw new Error("Certification not found");
    }

    if (data.certificationCode) {
      const duplicate = await Certification.findOne({
        certificationCode: data.certificationCode.toUpperCase(),
        _id: {
          $ne: id
        }
      });

      if (duplicate) {
        throw new Error("Certification code already exists");
      }

      data.certificationCode = data.certificationCode.toUpperCase();
    }

    const updatedCertification = await Certification.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("skills", "skillName skillCode")
      .populate("relatedCareers")
      .populate("relatedCourses");

    return updatedCertification;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE CERTIFICATION
// =====================================================

const deleteCertification = async (id) => {
  try {
    const certification = await Certification.findById(id);

    if (!certification) {
      throw new Error("Certification not found");
    }

    await Certification.findByIdAndDelete(id);

    return {
      message: "Certification deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCertification,
  getAllCertifications,
  getActiveCertifications,
  getCertificationById,
  searchCertifications,
  getCertificationsBySkill,
  updateCertification,
  deleteCertification
};
