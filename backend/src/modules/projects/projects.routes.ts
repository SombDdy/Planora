import { Router } from "express";
import { getProjects, getProject } from "./projects.controller.js";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProject );

export default router;