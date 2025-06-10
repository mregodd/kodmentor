const Conversation = require('../models/Conversation');

const createConversation = async (req, res) => {
  const { userId, mentorId } = req.body;
  let conv = await Conversation.findOne({ userId, mentorId });
  if (!conv) {
    conv = await Conversation.create({ userId, mentorId });
  }
  res.json(conv);
};

const getConversation = async (req, res) => {
  const { userId, mentorId } = req.params;
  const conv = await Conversation.findOne({ userId, mentorId });
  if (!conv) return res.status(404).json({ message: 'Conversation not found' });
  res.json(conv);
};

module.exports = { createConversation, getConversation };