import MentorModel from "../model/Mentor.model.js";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      skills,
      interest_areas,
      district,
      state,
      proficient_language,
      college,
      max_load,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !mobile ||
      !district ||
      !state ||
      !proficient_language ||
      !skills ||
      !interest_areas ||
      !college ||
      !max_load
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new mentor
    const newMentor = new MentorModel({
      name,
      email,
      mobile,
      district,
      state,
      proficient_language,
      skills,
      interest_areas,
      college,
      max_load,
    });

    // Save the mentor to the database
    const savedMentor = await newMentor.save();

    // Send the response
    res.status(201).json({ mentor: savedMentor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getMentor = async (req, res) => {
  try {
    const { email } = req.params;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Please provide the email!" });
    }

    // Create a new mentor
    const mentor = await MentorModel.find({ email });

    // Send the response
    res.status(201).json({ mentor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};


export const get_students = async (req, res) => {
  try {
    const { email } = req.params;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the mentor by email and populate students_assigned
    const mentor = await MentorModel.findOne({ email }).populate(
      "students_assigned"
    );

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Return the student details
    res.status(200).json({ students: mentor.students_assigned });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};