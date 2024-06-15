import { Router } from "express";
import * as teacherController from "../controllers/teacherController.js";
import * as courseController from "../controllers/courseController.js";

const router = Router();

/** POST Methods */
router.route("/register").post(teacherController.createTeacher); // register student
router.route("/create_course").post(courseController.createCourse); 

export default router;
