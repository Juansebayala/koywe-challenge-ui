import { QuoteNavigationButton } from "./QuoteNavigationButton";
import { QuoteTab } from "@/types/quote-tabs";

interface QuoteNavigationProps {
  activeTab: QuoteTab;
  onTabChange: (tab: QuoteTab) => void;
}

export function QuoteNavigation({
  activeTab,
  onTabChange,
}: QuoteNavigationProps) {
  return (
    <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
      <QuoteNavigationButton
        active={activeTab === QuoteTab.CREATE}
        onClick={() => onTabChange(QuoteTab.CREATE)}
      >
        Create Quote
      </QuoteNavigationButton>
      <QuoteNavigationButton
        active={activeTab === QuoteTab.SEARCH}
        onClick={() => onTabChange(QuoteTab.SEARCH)}
      >
        Search Quote
      </QuoteNavigationButton>
    </div>
  );
}
