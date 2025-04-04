interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      data-testid="error-message"
      className="p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 inline w-4 h-4 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
