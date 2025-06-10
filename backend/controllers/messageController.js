const Message = require('../models/Message');

const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const msgs = await Message.find({ conversationId }).sort('createdAt');
  res.json(msgs);
};

module.exports = { getMessages };
