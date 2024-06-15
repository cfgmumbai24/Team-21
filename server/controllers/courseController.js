import CourseModel from "../model/Course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, level, teacher_id, students_enrolled } =
      req.body;

    // Validate required fields
    if (!title || !description || !level || !teacher_id) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Create a new course
    const newCourse = new CourseModel({
      title,
      description,
      level,
      teacher_id,
      students_enrolled: students_enrolled || [],
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Send the response
    res.status(201).json({ course: savedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getCourse = async (req,res) => {
    const { teacher_id } = req.params;
    console.log(teacher_id);
    const courses = await CourseModel.find({ teacher_id });
    console.log(courses);
    res.status(201).json({ courses });
}