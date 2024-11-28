export const isValidCreditCard = (cardNumber: string): boolean => {
  if (!/^\d+$/.test(cardNumber)) return false;

  return (
    cardNumber
      .split("")
      .reverse()
      .reduce((sum, digit, index) => {
        let num = parseInt(digit, 10);
        if (index % 2 !== 0) num = num * 2 > 9 ? num * 2 - 9 : num * 2;
        return sum + num;
      }, 0) %
      10 ===
    0
  );
};
