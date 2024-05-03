import { Router } from "express";
import PostRoutes from "./PostRoutes.js"

const router=Router();
router.use("/api", PostRoutes);

export default router;

