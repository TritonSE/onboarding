/**
 * Task route requests.
 */

import express from "express";
import * as TaskController from "../controllers/task";

const router = express.Router();

router.get("/:id", TaskController.getTask);
router.post("/", TaskController.createTask);
router.delete("/:id", TaskController.removeTask);

export default router;
