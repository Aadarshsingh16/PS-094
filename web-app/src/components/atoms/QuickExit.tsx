import React from "react";

interface QuickExitProps {
  redirectUrl?: string;
}

export function QuickExit({ redirectUrl = "https://www.google.com" }: QuickExitProps) {
  const handleExit = () => {
    // Immediately navigate away from the page
    window.location.replace(redirectUrl);
  };

  return (
    <button
      id="quick-exit-btn"
      onClick={handleExit}
      className="
        w-full flex items-center justify-center gap-2
        bg-slate-900 hover:bg-slate-800
        text-white text-sm font-medium
        rounded-xl px-4 py-2.5
        transition-colors duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white
      "
      aria-label="Quick exit — leave this site immediately"
    >
      <span aria-hidden="true">✕</span>
      Quick exit
    </button>
  );
}
