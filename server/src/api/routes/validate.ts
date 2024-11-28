import { Router } from "express";
import { isValidCreditCard } from "../utils/isValidCreditCard";
import { type CardReq } from "../types";

const router = Router();

router.post("/card", (req: CardReq, res: any) => {
  const { cardNumber } = req.body;

  if (typeof cardNumber !== "string" || !cardNumber.trim()) {
    return res.status(400).json({
      error: "Invalid input",
    });
  }

  const isValid = isValidCreditCard(cardNumber.trim());
  return res.json({
    valid: isValid,
    message: isValid ? "Card is valid" : "Card is invalid",
  });
});

export default router;
