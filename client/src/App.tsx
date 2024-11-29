import { ChangeEvent, FormEvent, useState } from "react";
import useCardType from "./hooks/useCardType";
// import useValCard from "./hooks/useValidateCard";
import LoadingButton from "./components/LoadingButton";
import "./App.css";
import ValidatedInput from "./components/ValidatedInput";
import ValidatedLabel from "./components/ValidatedLabel";

function App() {
  const { cardType, cardLogo, detectCardType } = useCardType();
  const [creditCard, setCreditCard] = useState("");
  const [ofLength, setOfLength] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value && isValid) setMessage("");

    detectCardType(value);
    setCreditCard(value);
    setOfLength(value.length >= 15);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg min-h-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Billing Information
        </h2>

        <div className="mb-4 min-h-10">
          <ValidatedLabel
            label="Credit Card Number"
            cardType={cardType}
            cardLogo={cardLogo}
            value={creditCard}
          />
          <ValidatedInput
            value={creditCard}
            onChange={handleInputChange}
            maxLength={19}
            placeholder="Enter your card number"
            isValid={ofLength && Boolean(creditCard)}
            className="mb-4"
          />
        </div>

        <div>
          <LoadingButton
            loading={loading}
            disabled={!ofLength}
            type="submit"
            text="Purchase"
            loadingText="Processing..."
            className="mt-4"
          />

          <p
            className={`mt-4 text-center font-medium
              ${isValid ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        </div>
      </form>
    </div>
  );
}

export default App;
