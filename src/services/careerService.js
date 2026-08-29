const Career = require("../model/careerModel");

// =====================================================
// CREATE CAREER
// =====================================================

const createCareer = async (data) => {
  // Check duplicate career name
  const existingCareer = await Career.findOne({
    careerName: data.careerName
  });

  if (existingCareer) {
    throw new Error("Career with this name already exists");
  }

  // Create career
  const career = await Career.create(data);

  return career;
};

// =====================================================
// GET ALL CAREERS
// =====================================================

const getAllCareers = async () => {
  const careers = await Career.find({
    isActive: true
  })
    .populate("categoryId")
    .populate("subCategoryId");
  // .populate("relatedCourses")
  // .populate("relatedCertifications")
  // .sort({
  //   displayOrder: 1,
  //   createdAt: -1
  // });

  return careers;
};

// =====================================================
// GET CAREER BY ID
// =====================================================

const getCareerById = async (careerId) => {
  const career = await Career.findById(careerId)
    .populate("categoryId")
    .populate("subCategoryId");
  // .populate("relatedCourses")
  // .populate("relatedCertifications");

  if (!career) {
    throw new Error("Career not found");
  }

  return career;
};

// =====================================================
// UPDATE CAREER
// =====================================================

const updateCareer = async (careerId, data) => {
  const career = await Career.findByIdAndUpdate(
    careerId,
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  )
    .populate("categoryId")
    .populate("subCategoryId");
  // .populate("relatedCourses")
  // .populate("relatedCertifications");

  if (!career) {
    throw new Error("Career not found");
  }

  return career;
};

// =====================================================
// DELETE CAREER
// =====================================================

const deleteCareer = async (careerId) => {
  const career = await Career.findByIdAndDelete(careerId);

  if (!career) {
    throw new Error("Career not found");
  }

  return career;
};

// =====================================================
// SEARCH CAREERS
// =====================================================

const searchCareers = async (search) => {
  if (!search) {
    throw new Error("Search keyword is required");
  }

  const careers = await Career.find({
    isActive: true,

    $or: [
      {
        careerName: {
          $regex: search,
          $options: "i"
        }
      },
      {
        careerCode: {
          $regex: search,
          $options: "i"
        }
      },
      {
        shortDescription: {
          $regex: search,
          $options: "i"
        }
      },
      {
        description: {
          $regex: search,
          $options: "i"
        }
      }
    ]
  })
    .populate("categoryId")
    .populate("subCategoryId");

  return careers;
};

// =====================================================
// GET FEATURED CAREERS
// =====================================================

const getFeaturedCareers = async () => {
  const careers = await Career.find({
    isActive: true,
    isFeatured: true
  })
    .populate("categoryId")
    .populate("subCategoryId");

  return careers;
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createCareer,

  getAllCareers,

  getCareerById,

  updateCareer,

  deleteCareer,

  searchCareers,

  getFeaturedCareers
};
