const College = require("../model/collegeModel");

// =====================================================
// CREATE COLLEGE
// =====================================================

const createCollege = async (data) => {
  try {
    if (data.collegeCode) {
      const existingCollege = await College.findOne({
        collegeCode: data.collegeCode.toUpperCase()
      });

      if (existingCollege) {
        throw new Error("College code already exists");
      }

      data.collegeCode = data.collegeCode.toUpperCase();
    }

    const college = await College.create(data);

    return college;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ALL COLLEGES
// =====================================================

const getAllColleges = async () => {
  try {
    const colleges = await College.find()
      .populate("courses")
      .sort({ displayOrder: 1 });

    return colleges;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET ACTIVE COLLEGES
// =====================================================

const getActiveColleges = async () => {
  try {
    const colleges = await College.find({
      isActive: true
    })
      .populate("courses")
      .sort({ displayOrder: 1 });

    return colleges;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COLLEGE BY ID
// =====================================================

const getCollegeById = async (id) => {
  try {
    const college = await College.findById(id).populate("courses");

    if (!college) {
      throw new Error("College not found");
    }

    return college;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// SEARCH COLLEGES
// =====================================================

const searchColleges = async (search) => {
  try {
    const colleges = await College.find({
      isActive: true,
      $or: [
        {
          collegeName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          city: {
            $regex: search,
            $options: "i"
          }
        },
        {
          state: {
            $regex: search,
            $options: "i"
          }
        },
        {
          affiliation: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    })
      .populate("courses")
      .sort({ displayOrder: 1 });

    return colleges;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COLLEGES BY STATE
// =====================================================

const getCollegesByState = async (state) => {
  try {
    const colleges = await College.find({
      state: {
        $regex: `^${state}$`,
        $options: "i"
      },
      isActive: true
    })
      .populate("courses")
      .sort({ displayOrder: 1 });

    return colleges;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// GET COLLEGES BY CITY
// =====================================================

const getCollegesByCity = async (city) => {
  try {
    const colleges = await College.find({
      city: {
        $regex: `^${city}$`,
        $options: "i"
      },
      isActive: true
    })
      .populate("courses")
      .sort({ displayOrder: 1 });

    return colleges;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// UPDATE COLLEGE
// =====================================================

const updateCollege = async (id, data) => {
  try {
    const existingCollege = await College.findById(id);

    if (!existingCollege) {
      throw new Error("College not found");
    }

    if (data.collegeCode) {
      const duplicateCollege = await College.findOne({
        collegeCode: data.collegeCode.toUpperCase(),
        _id: {
          $ne: id
        }
      });

      if (duplicateCollege) {
        throw new Error("College code already exists");
      }

      data.collegeCode = data.collegeCode.toUpperCase();
    }

    const updatedCollege = await College.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate("courses");

    return updatedCollege;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// DELETE COLLEGE
// =====================================================

const deleteCollege = async (id) => {
  try {
    const college = await College.findById(id);

    if (!college) {
      throw new Error("College not found");
    }

    await College.findByIdAndDelete(id);

    return {
      message: "College deleted successfully"
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCollege,
  getAllColleges,
  getActiveColleges,
  getCollegeById,
  searchColleges,
  getCollegesByState,
  getCollegesByCity,
  updateCollege,
  deleteCollege
};
