const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const u = await User.create(req.body);
    res.status(201).json(u);
  } catch (err) {
    res.status(400).json({ message: err.code===11000 ? 'Email already in use' : 'Failed to create user' });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const loginUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (name && user.name !== name) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { createUser, getUsers, loginUser };
