import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import LoadingButton from "./components/LoadingButton";
import ValidatedInput from "./components/ValidatedInput";
import ValidatedLabel from "./components/ValidatedLabel";
import useCardType from "./hooks/useCardType";
import validateCard, { ValidationResponse } from "./routes/validateCard";

function App() {
  const { cardType, cardLogo, detectCardType } = useCardType();
  const [creditCard, setCreditCard] = useState("");
  const [ofLength, setOfLength] = useState(false);

  const query = useMutation<ValidationResponse, Error, string>({
    mutationFn: validateCard,
    onSuccess: (data) => {
      if (data.valid) setCreditCard("");
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value && query?.data?.valid) query.reset();

    detectCardType(value);
    setCreditCard(value);
    setOfLength(value.length >= 15);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    query.mutate(creditCard);
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
            loading={query.isPending}
            disabled={!ofLength || query.isPending}
            type="submit"
            text="Purchase"
            loadingText="Processing..."
            className="mt-4"
          />

          <p
            className={`mt-4 text-center font-medium
              ${query?.data?.valid ? "text-green-600" : "text-red-600"}`}
          >
            {query?.data?.message || query?.error?.message}
          </p>
        </div>
      </form>
    </div>
  );
}

export default App;
