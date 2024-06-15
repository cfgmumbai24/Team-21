import VideoModel from "../model/Video.model.js";

export const upload_video = async (req, res) => {
  try {
    const { title, description, url, teacher_id, course_id } = req.body;

    // Validate required fields
    if (!title || !url || !teacher_id) {
      return res
        .status(400)
        .json({ message: "Title, URL, and Teacher ID are required" });
    }

    // Create a new video
    const newVideo = new VideoModel({
      title,
      description,
      url,
      teacher_id,
      course_id,
    });

    // Save the video to the database
    const savedVideo = await newVideo.save();

    // Send the response
    res.status(201).json({ video: savedVideo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const get_videos = async (req, res) => {
    const { course_id } = req.params;
    
    const videos = VideoModel.find({ course_id })
    
    console.log(videos);

    return res.json({ videos });
}