const Mentor = require('../models/Mentor');


const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    return res.json(mentors);
  } catch {
    return res.status(500).json({ message: 'Failed to fetch mentors' });
  }
};

const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    return res.json(mentor);
  } catch {
    return res.status(500).json({ message: 'Error fetching mentor' });
  }
};

const createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    return res.status(201).json(mentor);
  } catch {
    return res.status(500).json({ message: 'Failed to create mentor' });
  }
};

const updateMentor = async (req, res) => {
  try {
    const updated = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Mentor not found' });
    return res.json(updated);
  } catch {
    return res.status(500).json({ message: 'Failed to update mentor' });
  }
};

const deleteMentor = async (req, res) => {
  try {
    const deleted = await Mentor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Mentor not found' });
    return res.json({ message: 'Mentor deleted successfully' });
  } catch {
    return res.status(500).json({ message: 'Failed to delete mentor' });
  }
};

module.exports = {
  getMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor,
};
