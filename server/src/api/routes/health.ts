import { Router, Request, Response } from "express";

const router = Router();

const getHealth = (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
};

router.get("/", getHealth);

export default router;
