import { FC } from "react";

const Toast: FC<{
  message: string;
  onClose: () => void;
  handleViewOrder: () => void;
}> = ({ message, onClose, handleViewOrder }) => {
  return (
    <>
      <div
        className="fixed bottom-5 left-5 flex items-center bg-white shadow-lg border rounded-lg p-4 space-x-4 animate-slide-up"
        style={{ zIndex: 1000 }}
      >
        <div className="text-sm text-gray-700">
          {message}{" "}
          <button
            onClick={handleViewOrder}
            className="text-blue-500 underline focus:outline-none"
          >
            View Card
          </button>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default Toast;
