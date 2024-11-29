import { ChangeEvent, FC } from "react";

interface ValidatedInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
  isValid?: boolean;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}

const ValidatedInput: FC<ValidatedInputProps> = ({
  value,
  onChange,
  maxLength = 255,
  placeholder = "",
  isValid = false,
  className = "",
  inputClassName = "",
  iconClassName = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${inputClassName}`}
      />
      {isValid && value && (
        <span
          className={`absolute inset-y-0 right-3 flex items-center text-green-500 ${iconClassName}`}
        >
          ✓
        </span>
      )}
    </div>
  );
};

export default ValidatedInput;
