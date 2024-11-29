import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import "./App.css";
import LoadingButton from "./components/LoadingButton";
import ValidatedInput from "./components/ValidatedInput";
import ValidatedLabel from "./components/ValidatedLabel";
import useCardType from "./hooks/useCardType";
import validateCard, { ValidationResponse } from "./routes/validateCard";
import Toast from "./components/Toast";
import Modal from "./components/Modal";

function App() {
  const { cardType, cardLogo, detectCardType } = useCardType();
  const [creditCard, setCreditCard] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validLength = useMemo(() => creditCard.length >= 15, [creditCard]);
  const query = useMutation<ValidationResponse, Error, string>({
    mutationFn: validateCard,
    onSuccess: (data) => {
      if (data.isValid) {
        setCreditCard("");
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value && query?.data?.isValid) query.reset();

    detectCardType(value);
    setCreditCard(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    query.mutate(creditCard);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg min-h-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">
            Credit Validator
          </h2>

          <div className="mb-4">
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
              isValid={validLength && Boolean(creditCard)}
            />
          </div>

          <div>
            <LoadingButton
              loading={query.isPending}
              disabled={!validLength || query.isPending}
              type="submit"
              text="Validate Card"
              loadingText="Processing..."
              className="mt-4"
            />

            <p
              className={`mt-4 text-center font-medium
              ${query?.data?.isValid ? "text-green-600" : "text-red-600"}`}
            >
              {query?.data?.message || query?.error?.message}
            </p>
          </div>
        </form>
      </div>

      {showToast && (
        <Toast
          message="Your card has been validated!"
          onClose={() => setShowToast(false)}
          handleViewOrder={() => setShowModal(true)}
        />
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          orderDetails={query?.data}
        />
      )}
    </>
  );
}

export default App;
