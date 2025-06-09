const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  linkedin: { type: String },
  skills:  { type: [String], default: [] } 
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);
