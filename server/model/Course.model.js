import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true }, // UG, PG, Global
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    students_enrolled: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.Courses ||
  mongoose.model("Course", CourseSchema);
