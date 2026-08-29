const validateRegister = (req, res, next) => {
  const { firstName, email, password } = req.body;

  if (!firstName) {
    return res.status(400).json({
      success: false,
      message: "First name is required"
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin
};
