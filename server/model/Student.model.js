import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  assessment_id: mongoose.Schema.Types.ObjectId,
  score: Number,
  feedback: String,
});

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number },
    community: { type: String, required: true },
    attendance: { type: Number },
    education_level: { type: String, required: true }, // UG, PG, or Global
    district: { type: String, required: true },
    state: { type: String, required: true },
    income_certificate: { type: String, required: true },
    proficient_languages: { type: [String], required: true },
    mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
    courses_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    assessments: [AssessmentSchema],
    scholarships: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.Students ||
  mongoose.model("Student", StudentSchema);
