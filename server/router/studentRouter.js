import { Router } from "express";
import * as studentController from "../controllers/studentController.js";

const router = Router();

/** POST Methods */
router.route("/register").post(studentController.register); // register student

/** GET Methods */
router.route("/:email").get(studentController.getStudent); // get student by email
router
  .route("/:email/mentor")
  .get(studentController.getMentorForStudent); // get mentor for student by email

export default router;
