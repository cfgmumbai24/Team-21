import TeacherModel from "../model/Teacher.model.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Validate required fields
    if (!name || !email || !password || !specialization) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Create a new teacher
    const newTeacher = new TeacherModel({
      name,
      email,
      password,
      specialization,
      courses_created: [],
      videos_uploaded: [],
    });

    // Save the teacher to the database
    const savedTeacher = await newTeacher.save();

    // Send the response
    res.status(201).json({ teacher: savedTeacher });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
