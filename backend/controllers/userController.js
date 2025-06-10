const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const u = await User.create(req.body);
    res.status(201).json(u);
  } catch (err) {
    res.status(400).json({ message: err.code===11000 ? 'Email already in use' : 'Failed to create user' });
  }
};

// Get all users (for admin dashboard)
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports = { createUser, getUsers };
