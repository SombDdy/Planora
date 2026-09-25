import { Router } from "express";
import { getUserController, getUsersController, postUserController } from "./users.controller.js";

const router = Router();

router.get("/", getUsersController);
router.get("/:id", getUserController);
router.post("/", postUserController);

export default router;