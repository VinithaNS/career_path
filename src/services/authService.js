const User = require("../model/userModel");

const { hashPassword, comparePassword } = require("./passwordService");

const { generateToken } = require("./tokenService");

const registerUser = async (data) => {
  const { firstName, lastName, email, mobile, password, role } = data;

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobile,
    password: hashedPassword,
    role: role || "student"
  });

  // Generate token
  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    },
    token
  };
};

const loginUser = async (email, password) => {
  // Find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Update last login
  user.lastLogin = new Date();

  await user.save();

  // Generate JWT
  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    },
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};
