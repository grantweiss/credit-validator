import { FC } from "react";
import { ValidationResponse } from "../routes/validateCard";

const Modal: FC<{
  isOpen: boolean;
  onClose: () => void;
  orderDetails: ValidationResponse | undefined;
}> = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Card Details
        </h2>

        {orderDetails &&
          Object.entries(orderDetails).map(([key, value]) => (
            <p key={key} className="text-gray-600">
              <span className="font-semibold">{key}:</span> {String(value)}
            </p>
          ))}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
