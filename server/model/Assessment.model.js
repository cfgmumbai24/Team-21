const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  assessment_date: { type: Date, required: true },
  score: { type: Number, required: true },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  feedback: { type: String },
},{
    timestamps:true
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
