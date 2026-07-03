import { Router } from "express";
import * as controller from "../controllers/homepage.controller.js";

const router = Router();

router.get("/", controller.getOne);

export default router;
