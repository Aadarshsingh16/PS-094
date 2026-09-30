import React from "react";

interface StatusToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export function StatusToggle({ checked, onChange, disabled = false, id }: StatusToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2
        ${checked ? "bg-status-on" : "bg-status-off"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-bg-primary shadow-sm transition-transform duration-200
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
