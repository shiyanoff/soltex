import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import itemRoutes from "./item.routes.js";
import leadsRoutes from "./lead.routes.js";
import homepageRoutes from "@/routes/homepage.routes.js";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);
router.use("/homepage", homepageRoutes);
router.use("/leads", leadsRoutes);

export default router;
