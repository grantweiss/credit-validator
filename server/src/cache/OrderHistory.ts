import { v4 as uuidv4 } from "uuid";

interface CacheValue {
  redactedCardNumber: string;
  isValid: boolean;
}

class OrderHistory {
  private store: Map<string, CacheValue>;

  constructor() {
    this.store = new Map();
  }

  createEntry(cardNumber: string, isValid: boolean): string {
    const redactedCardNumber = this.redactCardNumber(cardNumber);
    const id = uuidv4();
    this.store.set(id, { redactedCardNumber, isValid });
    return id;
  }

  getEntry(id: string): CacheValue | undefined {
    return this.store.get(id);
  }

  getAllEntries(): {
    id: string;
    redactedCardNumber: string;
    isValid: boolean;
  }[] {
    return Array.from(this.store.entries()).map(([id, value]) => ({
      id,
      redactedCardNumber: value.redactedCardNumber,
      isValid: value.isValid,
    }));
  }

  private redactCardNumber(cardNumber: string): string {
    return cardNumber.replace(/\d(?=\d{4})/g, "*");
  }
}

export default OrderHistory;
