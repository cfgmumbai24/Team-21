const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: [String], required: true },
  courses_created: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  videos_uploaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
},{
    timestamps:true
});

module.exports = mongoose.model('Teacher', TeacherSchema);
