import StudentModel from "../model/Student.model.js";

// Register a new student
export const register = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      mobile,
      community,
      attendance,
      education_level,
      district,
      state,
      income_certificate,
      proficient_languages,
      mentor_id,
      courses_enrolled,
      assessments,
      scholarships,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !age ||
      !email ||
      !community ||
      !education_level ||
      !district ||
      !state ||
      !income_certificate ||
      !proficient_languages
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new student
    const newStudent = new StudentModel({
      name,
      age,
      email,
      mobile,
      community,
      attendance,
      education_level,
      district,
      state,
      income_certificate,
      proficient_languages,
      mentor_id,
      courses_enrolled,
      assessments,
      scholarships,
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Send the response
    res.status(201).json({ student: savedStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Get a student by email
export const getStudent = async (req, res) => {
  try {
    const { email } = req.params;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Please provide the email!" });
    }

    // Find the student by email
    const student = await StudentModel.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Send the response
    res.status(200).json({ student });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Get mentor for a student by student email
export const getMentorForStudent = async (req, res) => {
  try {
    const { email } = req.params;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the student by email and populate mentor_id
    const student = await StudentModel.findOne({ email }).populate("mentor_id");
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the mentor details
    res.status(200).json({ mentor: student });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
