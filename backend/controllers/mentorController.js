const Mentor = require('../models/Mentor');

const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mentors' });
  }
};

const createMentor = async (req, res) => {
  const { name, expertise, linkedin } = req.body;
  if (!name || !expertise) {
    return res.status(400).json({ message: 'Name and expertise are required' });
  }

  try {
    const newMentor = new Mentor({ name, expertise, linkedin });
    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create mentor' });
  }
};

const deleteMentor = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Mentor.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.status(200).json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete mentor' });
  }
};

module.exports = { getMentors, createMentor, deleteMentor };