import { Router } from "express";
const router = Router();

/** import all controllers */
import * as mentorController from "../controllers/mentorController.js";
import Auth, { localVariables } from "../middleware/auth.js";

/** POST Methods */
router.route("/register").post(mentorController.register); // register mentor

// /** GET Methods */
router.route("/:email").get(mentorController.getMentor); // get mentor by ID

router.route("/get_students/:email").get(mentorController.get_students); // get mentor by ID


export default router;
