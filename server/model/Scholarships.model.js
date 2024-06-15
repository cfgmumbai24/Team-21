const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  education_level: { type: String, required: true },  // UG, PG, Global
  eligibility_criteria: { type: String, required: true },
  application_deadline: { type: Date, required: true },
  students_applied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
},{
    timestamps:true
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
