import { Router } from "express";
import healthRoutes from "./health";
import validateRoutess from "./validate";

const router = Router();

router.use("/health", healthRoutes);
router.use("/validate", validateRoutess);

export default router;
