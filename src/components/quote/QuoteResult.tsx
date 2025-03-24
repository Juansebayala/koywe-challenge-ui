import { Quote } from "@/types/quote";
import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { CopyIcon } from "@/components/ui/icons/CopyIcon";

interface QuoteResultProps {
  quote: Quote;
}

export function QuoteResult({ quote }: QuoteResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(quote.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-blue-50 p-6 rounded-lg border border-blue-100"
      data-testid="quote-result"
    >
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Quote Result</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-blue-100">
          <span className="text-blue-700 font-medium mr-4">ID:</span>
          <div className="flex items-center gap-3">
            <span
              className="text-blue-900 font-mono text-sm"
              data-testid="quote-id"
            >
              {quote.id}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-blue-200 transition-colors cursor-pointer"
              title="Copy ID"
              data-testid={copied ? "copy-id-button-copied" : "copy-id-button"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-blue-100">
          <span className="text-blue-700 font-medium">Rate:</span>
          <span
            className="text-blue-900 font-semibold text-lg"
            data-testid="rate-value"
          >
            {quote.rate}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-blue-100">
          <span className="text-blue-700 font-medium">Converted Amount:</span>
          <span
            className="text-blue-900 font-semibold text-lg"
            data-testid="converted-amount"
          >
            {quote.convertedAmount}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-blue-700 font-medium">Expires at:</span>
          <span className="text-blue-900 font-medium" data-testid="expires-at">
            {new Date(quote.expiresAt).toLocaleTimeString("en-US", {
              hour12: false,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
