const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },  // URL to the video
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  uploaded_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', VideoSchema);
