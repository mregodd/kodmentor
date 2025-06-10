const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Mentor' },
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);