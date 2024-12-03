import React from "react";
import { IoMdClose } from "react-icons/io";
import { StoreValidationResponse } from "../routes/getValidCards";

type ValidatedCardsModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error?: Error | null;
  data?: StoreValidationResponse | null;
};

const ValidatedCardsModal: React.FC<ValidatedCardsModalProps> = ({
  isModalOpen,
  onClose,
  isLoading,
  error,
  data,
}) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-11/12 max-w-2xl p-6 rounded-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Validated Cards</h2>
          <IoMdClose
            onClick={onClose}
            className="hover:cursor-pointer size-6"
          />
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        {data && Boolean(data?.entries?.length) ? (
          <ul className="space-y-4">
            {data?.entries?.map((entry) => (
              <li
                key={entry.id}
                className="p-4 border border-gray-300 rounded-lg"
              >
                <p>
                  <strong>Card:</strong> {entry.redactedCardNumber}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {entry.isValid ? (
                    <span className="text-green-500">Valid</span>
                  ) : (
                    <span className="text-red-500">Invalid</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No validated cards found</p>
        )}
      </div>
    </div>
  );
};

export default ValidatedCardsModal;
