import { Router } from "express";
import { getProjects, getProject, postProject } from "./projects.controller.js";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProject );
router.post("/", postProject)

export default router;