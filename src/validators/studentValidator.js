const validateStudent = (req, res, next) => {
  const { dateOfBirth, gender, schoolName, currentClass, board, stream } =
    req.body;

  if (gender && !["male", "female", "other"].includes(gender)) {
    return res.status(400).json({
      success: false,
      message: "Invalid gender"
    });
  }

  next();
};

module.exports = validateStudent;
