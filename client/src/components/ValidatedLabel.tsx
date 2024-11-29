import { FC } from "react";

interface ValidatedLabelProps {
  label: string;
  value?: string;
  cardType?: string | null;
  cardLogo?: string;
  className?: string;
}

const ValidatedLabel: FC<ValidatedLabelProps> = ({
  label,
  cardType,
  cardLogo,
  className = "",
  value = "",
}) => {
  return (
    <div
      className={`flex justify-between items-center mb-2 ${className}`}
      aria-label={label}
    >
      <label
        htmlFor="credit-card-input"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {cardType && value && (
        <img
          src={cardLogo}
          alt={`${cardType} logo`}
          style={{ width: 60, height: 20 }}
          className="-mr-3"
        />
      )}
    </div>
  );
};

export default ValidatedLabel;
