"use client";

import React from "react";
import { Bell, Search } from "lucide-react";

interface TopBarProps {
  greeting?: string;
  subtitle?: string;
  notificationCount?: number;
  userInitials?: string;
  showSearch?: boolean;
  rightSlot?: React.ReactNode;
}

export function TopBar({
  greeting,
  subtitle,
  notificationCount = 0,
  userInitials = "PS",
  showSearch = false,
  rightSlot,
}: TopBarProps) {
  return (
    <header className="app-row flex items-center justify-between px-8 py-5 border-b border-border-subtle bg-bg-primary">
      {/* Left: greeting or search */}
      <div className="flex-1 min-w-0">
        {greeting ? (
          <div>
            <h1 className="font-heading text-xl font-bold text-text-primary">{greeting}</h1>
            {subtitle && <p className="text-text-secondary text-sm mt-0.5">{subtitle}</p>}
          </div>
        ) : showSearch ? (
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              placeholder="Search cases, alerts..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-default bg-bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Search cases and alerts"
            />
          </div>
        ) : null}
      </div>

      {/* Right: search + bell + avatar */}
      <div className="flex items-center gap-3 shrink-0">
        {greeting && showSearch && (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              placeholder="Search cases, alerts..."
              className="pl-9 pr-4 py-2 rounded-xl border border-border-default bg-bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary w-52"
              aria-label="Search"
            />
          </div>
        )}

        {rightSlot}

        {/* Notification bell */}
        <button
          id="notification-bell"
          className="relative p-2 rounded-xl hover:bg-nav-hover transition-colors"
          aria-label={`${notificationCount} notifications`}
        >
          <Bell size={20} className="text-text-secondary" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-risk-critical rounded-full flex items-center justify-center text-text-inverse text-[9px] font-bold">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full bg-brand-subtle flex items-center justify-center text-xs font-bold text-brand-primary cursor-pointer"
          aria-label={`User ${userInitials}`}
        >
          {userInitials}
        </div>
      </div>
    </header>
  );
}
