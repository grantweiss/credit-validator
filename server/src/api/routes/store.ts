import { Router, Request } from "express";
import { OrderStore } from "../..";

const router = Router();

router.get("/", (req: Request, res: any) => {
  const entries = OrderStore.getAllEntries();
  return res.json({ entries });
});

router.get("/:id", (req: Request<{ id: string }>, res: any) => {
  const { id } = req.params;

  const entry = OrderStore.getEntry(id);
  if (!entry) {
    return res.status(404).json({
      message: "Entry not found",
    });
  }

  return res.json({
    id,
    redactedCardNumber: entry.redactedCardNumber,
    isValid: entry.isValid,
  });
});

export default router;
