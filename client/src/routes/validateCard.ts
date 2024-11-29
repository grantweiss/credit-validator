export type ValidationResponse = {
  valid: boolean;
  message: string;
};

const validateCard = async (
  cardNumber: string
): Promise<ValidationResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API}/api/validate/card`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardNumber }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "An unexpected error occurred");
  }

  return response.json();
};

export default validateCard;
