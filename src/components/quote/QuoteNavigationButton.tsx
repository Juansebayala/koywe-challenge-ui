interface QuoteNavigationButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function QuoteNavigationButton({
  active,
  onClick,
  children,
}: QuoteNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
        active
          ? "bg-white text-blue-600 shadow-sm"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}
