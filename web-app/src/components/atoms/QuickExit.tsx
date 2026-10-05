import React from "react";

interface QuickExitProps {
  redirectUrl?: string;
  compact?: boolean;
}

export function QuickExit({ redirectUrl = "https://www.google.com", compact = false }: QuickExitProps) {
  const handleExit = () => {
    // Immediately navigate away from the page
    window.location.replace(redirectUrl);
  };

  return (
    <button
      id={compact ? undefined : "quick-exit-btn"}
      onClick={handleExit}
      className={
        compact
          ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-quick-exit px-3 py-2 text-xs font-medium text-text-inverse hover:bg-quick-exit-hover"
          : "flex w-full items-center justify-center gap-2 rounded-xl bg-quick-exit px-4 py-2.5 text-sm font-medium text-text-inverse hover:bg-quick-exit-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse"
      }
      aria-label="Quick exit — leave this site immediately"
    >
      <span aria-hidden="true">✕</span>
      <span className={compact ? undefined : "nav-copy"}>Quick exit</span>
    </button>
  );
}
