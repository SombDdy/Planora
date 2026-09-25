import { Router } from "express";
import { getTasksController, getTaskController, postTaskController, patchTaskController, deleteTaskController } from "./tasks.controller.js";

const router = Router();

router.get("/", getTasksController);
router.get("/:id", getTaskController);
router.post("/", postTaskController);
router.patch("/:id", patchTaskController);
router.delete("/:id", deleteTaskController);

export default router;