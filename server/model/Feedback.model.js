const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  by_user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  by_user_type: { type: String, required: true, enum: ['student', 'mentor'] },
  to_user_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'to_user_type' },
  to_user_type: { type: String, enum: ['student', 'mentor'] },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  feedback_text: { type: String, required: true },
  rating: { type: Number, required: true },
},{
    timestamps:true
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
