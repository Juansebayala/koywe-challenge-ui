import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  "data-testid"?: string;
}

export function FormInput({
  id,
  label,
  type,
  placeholder,
  registration,
  error,
  "data-testid": dataTestId,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        {...registration}
        data-testid={dataTestId}
      />
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
