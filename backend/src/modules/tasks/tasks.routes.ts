import { Router } from "express";
import { getTasksController, getTaskController, postTaskController } from "./tasks.controller.js";

const router = Router();

router.get("/", getTasksController);
router.get("/:id", getTaskController);
router.post("/", postTaskController);

export default router;