import { Router } from "express";
const router = Router();

/** import all controllers */
import * as videoController from "../controllers/videoController.js";
import Auth, { localVariables } from "../middleware/auth.js";

/** POST Methods */
router.route("/upload").post(videoController.upload_video); // register mentor

// get videos
router.route("/:course_id").get(videoController.get_videos); 
export default router;
