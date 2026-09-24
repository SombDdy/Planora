import { Router } from "express";
import { getTasksController, getTaskController } from "./tasks.controller.js";

const router = Router();

router.get("/", getTasksController);
router.get("/:id", getTaskController);

export default router;