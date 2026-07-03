import { Router } from "express";
import * as controller from "../controllers/lead.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById); // можно оставить
router.post("/", controller.create);    // для фронта

export default router;
