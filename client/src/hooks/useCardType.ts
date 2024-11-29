import { useState } from "react";
import americanExpressLogo from "../assets/american-express.svg";
import visaLogo from "../assets/visa.svg";
import mastercardLogo from "../assets/mastercard.svg";
import discoverLogo from "../assets/discover.svg";

const useCardType = () => {
  const [cardType, setCardType] = useState<string>("");
  const [cardLogo, setCardLogo] = useState<string>("");

  const cardMap: { [key: string]: string } = {
    visa: visaLogo,
    amex: americanExpressLogo,
    mastercard: mastercardLogo,
    discover: discoverLogo,
  };

  const cardPatterns: { [key: string]: RegExp } = {
    visa: /^4/,
    mastercard: /^(5[1-5]|22[2-9][1-9]|2[3-6]\d{2}|27[01]\d|2720)/,
    amex: /^3[47]/,
    discover: /^(6011|65|64[4-9]|622)/,
  };

  const detectCardType = (number: string) => {
    for (const [card, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(number)) {
        setCardType(card);
        setCardLogo(cardMap[card]);
        return;
      }
    }
    setCardType("");
    setCardLogo("");
  };

  return { cardType, cardLogo, detectCardType };
};

export default useCardType;
