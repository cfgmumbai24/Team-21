const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile : { type : Number},
  skills: { type: [String], required: true },
  interest_areas: { type: [String], required: true },
  college: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  proficient_languages: { type: [String], required: true },
  students_assigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  max_load: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', MentorSchema);
