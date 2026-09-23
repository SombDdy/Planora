import { Router } from "express";
import { getProjectsController, getProjectController, postProjectController, patchProjectController, deleteProjectController } from "./projects.controller.js";

const router = Router();

router.get("/", getProjectsController);
router.get("/:id", getProjectController);
router.post("/", postProjectController);
router.patch("/:id", patchProjectController);
router.delete("/:id", deleteProjectController);

export default router;