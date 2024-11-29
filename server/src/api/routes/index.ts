import { Router } from "express";
import healthRoutes from "./health";
import validateRoutess from "./validate";
import storeRoutes from "./store";

const router = Router();

router.use("/health", healthRoutes);
router.use("/validate", validateRoutess);
router.use("/store", storeRoutes);

export default router;
