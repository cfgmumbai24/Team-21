import { Router } from "express";
const router = Router();

/** import all controllers */
import * as courseController from "../controllers/courseController.js";
import Auth, { localVariables } from "../middleware/auth.js";

// /** GET Methods */
router.route("/:teacher_id").get(courseController.getCourse); // get mentor by ID


export default router;
