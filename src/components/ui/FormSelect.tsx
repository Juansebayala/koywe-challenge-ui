import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {
  FaBitcoin,
  FaEthereum,
  FaDollarSign,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Currency } from "@/types/quote";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: Option[];
  registration: UseFormRegisterReturn;
  error?: FieldError;
  "data-testid"?: string;
}

const CurrencyIcon = ({ currency }: { currency: string }) => {
  switch (currency) {
    case Currency.BTC:
      return <FaBitcoin className="text-[#f7931a]" />;
    case Currency.ETH:
      return <FaEthereum className="text-[#627eea]" />;
    case Currency.USDC:
      return <FaDollarSign className="text-[#2775ca]" />;
    case Currency.ARS:
      return <FaMoneyBillWave className="text-[#6B8E23]" />;
    case Currency.CLP:
      return <FaMoneyBillWave className="text-[#4B0082]" />;
    case Currency.MXN:
      return <FaMoneyBillWave className="text-[#006400]" />;
    default:
      return <FaDollarSign className="text-gray-600" />;
  }
};

export function FormSelect({
  id,
  label,
  options,
  registration,
  error,
  "data-testid": dataTestId,
}: FormSelectProps) {
  const [selectedValue, setSelectedValue] = useState("");

  const { onChange, ...rest } = registration;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    onChange(e);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="appearance-none block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleChange}
          {...rest}
          data-testid={dataTestId}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <CurrencyIcon currency={selectedValue} />
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-500 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
}
