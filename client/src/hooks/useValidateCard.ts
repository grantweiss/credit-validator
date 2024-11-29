import { useState } from "react";

interface ValidationResponse {
  valid: boolean;
  message: string;
}

const useValCard = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateCard = async (cardNumber: string) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/validate/card`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardNumber }),
        }
      );

      if (!response.ok) {
        throw new Error("An unexpected error occurred");
      }

      const data: ValidationResponse = await response.json();
      setMessage(data.message);

      if (data.valid) {
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

  return { loading, message, isValid, validateCard, setMessage };
};

export default useValCard;
