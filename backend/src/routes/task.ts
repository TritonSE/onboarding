/**
 * Task route requests.
 */

import express from "express";
import * as TaskController from "../controllers/task";
import * as TaskValidator from "../validators/task";

const router = express.Router();

router.get("/:id", TaskController.getTask);
router.post("/", TaskValidator.createTask, TaskController.createTask);
router.delete("/:id", TaskController.removeTask);

export default router;
