const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  appointment_date: { type: Date, required: true },
  status: { type: String, required: true, enum: ['Scheduled', 'Completed', 'Cancelled'] },
  appointment_time:{ type: String, required: true }
},{
    timestamps:true
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
