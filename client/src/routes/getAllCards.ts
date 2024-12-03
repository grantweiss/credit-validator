export type StoreValidationResponse = {
  entries: {
    id: string;
    redactedCardNumber: string;
    isValid: boolean;
  }[];
};

const getAllCards = async (): Promise<StoreValidationResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API}/api/store`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "An unexpected error occurred");
  }

  const data: StoreValidationResponse = await response.json();
  return data;
};

export default getAllCards;
