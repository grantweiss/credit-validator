import { Router } from "express";
import { isValidCreditCard } from "../utils/isValidCreditCard";
import { type CardReq } from "../types";
import { OrderStore } from "../..";

const router = Router();

router.post("/card", (req: CardReq, res: any) => {
  const { cardNumber } = req.body;

  if (typeof cardNumber !== "string" || !cardNumber.trim()) {
    return res.status(400).json({
      error: "Invalid input",
    });
  }

  const trimmedCardNumber = cardNumber.trim();
  const isValid = isValidCreditCard(trimmedCardNumber);
  const id = OrderStore.createEntry(trimmedCardNumber, isValid);

  return res.json({
    id,
    redactedCardNumber: OrderStore.getEntry(id)?.redactedCardNumber || "",
    isValid,
    message: isValid ? "Card is valid" : "Card is invalid",
  });
});

export default router;
