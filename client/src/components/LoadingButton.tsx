import { FC, MouseEventHandler } from "react";

interface LoadingButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
  disabled: boolean;
  text: string;
  loadingText?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const LoadingButton: FC<LoadingButtonProps> = ({
  onClick,
  loading,
  disabled,
  text,
  loadingText = "Processing...",
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${
        loading || disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default LoadingButton;
