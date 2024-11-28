import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import americanExpressLogo from "./assets/american-express.svg";
import visaLogo from "./assets/visa.svg";
import mastercardLogo from "./assets/mastercard.svg";
import discoverLogo from "./assets/discover.svg";
import "./App.css";

const cardMap: Record<string, string> = {
  visa: visaLogo,
  amex: americanExpressLogo,
  mastercard: mastercardLogo,
  discover: discoverLogo,
};

const getCardType = (number: string): string => {
  const cardPatterns: { [key: string]: RegExp } = {
    visa: /^4/,
    mastercard: /^(5[1-5]|22[2-9][1-9]|2[3-6]\d{2}|27[01]\d|2720)/,
    amex: /^3[47]/,
    discover: /^(6011|65|64[4-9]|622)/,
  };

  for (const [card, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(number)) {
      return card;
    }
  }
  return "";
};

function App() {
  const [creditCard, setCreditCard] = useState("");
  const [ofLength, setOfLength] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCreditCard(value);
    setOfLength(value.length >= 15);
    if (value) setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/validate/card`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardNumber: creditCard }),
        }
      );

      if (!response.ok) {
        throw new Error("An unexpected error occurred");
      }

      const data: { valid: boolean; message: string } = await response.json();
      setMessage(data.message);

      if (data.valid) {
        setCreditCard("");
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const displayCard = useMemo(() => {
    return cardMap[getCardType(creditCard)];
  }, [creditCard]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg min-h-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Billing Information
        </h2>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Credit Card Number
            </label>
            {displayCard && (
              <img
                src={displayCard}
                alt="Card logo"
                style={{ width: 60, height: 20 }}
                className="-mr-3"
              />
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={creditCard}
              onChange={handleInputChange}
              maxLength={19}
              placeholder="Enter your card number"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {ofLength && (
              <span className="absolute inset-y-0 right-3 flex items-center text-green-500">
                ✓
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !ofLength}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${
            loading || !ofLength ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Purchase"}
        </button>

        <p
          className={`mt-4 text-center font-medium ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {message || ""}
        </p>
      </form>
    </div>
  );
}

export default App;
