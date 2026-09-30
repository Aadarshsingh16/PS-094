"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, ClipboardList, Briefcase, Heart, Lock,
  LayoutDashboard, Users, Bell, Activity, BarChart2, Settings,
  Phone,
} from "lucide-react";
import { QuickExit } from "@/components/atoms/QuickExit";

/* ─── Victim Sidebar ─── */
const victimNavItems = [
  { label: "Home",              href: "/victim/home",    Icon: Home },
  { label: "Check-in",         href: "/victim/checkin", Icon: ClipboardList },
  { label: "My case",          href: "/victim/mycase",  Icon: Briefcase },
  { label: "Support",          href: "/victim/support", Icon: Heart },
  { label: "Privacy & channels", href: "/victim/privacy", Icon: Lock },
];

/* ─── Officer Sidebar ─── */
const officerNavItems = [
  { label: "Dashboard",     href: "/officer/dashboard",      Icon: LayoutDashboard },
  { label: "Cases",         href: "/officer/cases",          Icon: Users },
  { label: "Alerts",        href: "/officer/alerts",         Icon: Bell },
  { label: "Interventions", href: "/officer/interventions",  Icon: Activity },
  { label: "Reports",       href: "/officer/reports",        Icon: BarChart2 },
  { label: "Settings",      href: "/officer/settings",       Icon: Settings },
];

interface SideNavFrameProps {
  embedded?: boolean;
}

interface NavItemProps {
  label: string;
  href: string;
  Icon: React.ElementType;
  active: boolean;
}

function NavItem({ label, href, Icon, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
        ${active
          ? "bg-nav-active text-brand-primary"
          : "text-text-secondary hover:bg-nav-hover hover:text-text-primary"
        }
      `}
    >
      <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
      <span className="nav-copy">{label}</span>
    </Link>
  );
}

/* ─── Victim Sidebar ─── */
export function VictimSideNav({ embedded = false }: SideNavFrameProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`side-rail bg-bg-primary border-r border-border-default flex flex-col w-sidebar-victim ${
        embedded ? "relative h-[720px] shrink-0" : "fixed left-0 top-0 h-full"
      }`}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="text-text-inverse font-bold text-sm font-heading">S</span>
          </div>
          <div>
            <div className="nav-copy font-heading font-bold text-text-primary text-sm leading-tight">SAHAYAK</div>
            <div className="nav-copy text-text-muted text-xs">Your safe space</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1" aria-label="Victim navigation">
        {victimNavItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href || pathname.startsWith(item.href + "/")}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 flex flex-col gap-3">
        {/* Helpline card */}
        <div className="bg-info-bg rounded-xl p-3">
          <div className="flex items-center gap-2 text-info-text text-xs font-medium mb-0.5">
            <Phone size={12} />
            Need a person?
          </div>
          <p className="text-info-muted text-xs">Call 14566, free, any time.</p>
        </div>

        {/* Quick exit */}
        <QuickExit />

        {/* User chip */}
        <div className="flex items-center gap-2 px-1 pt-1 border-t border-border-subtle">
          <div className="w-7 h-7 rounded-full bg-border-default flex items-center justify-center text-xs font-bold text-text-secondary">
            AS
          </div>
          <div>
            <div className="nav-copy text-xs font-medium text-text-primary">Asha</div>
            <div className="nav-copy text-xs text-text-muted">Preferred: SMS · English</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── Officer Sidebar ─── */
interface OfficerSideNavProps extends SideNavFrameProps {
  userName?: string;
  userRole?: string;
  userLocation?: string;
  initials?: string;
}

export function OfficerSideNav({
  userName = "Priya Sharma",
  userRole = "Counsellor",
  userLocation = "Ghaziabad",
  initials = "PS",
  embedded = false,
}: OfficerSideNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`side-rail bg-bg-primary border-r border-border-default flex flex-col w-sidebar-officer ${
        embedded ? "relative h-[720px] shrink-0" : "fixed left-0 top-0 h-full"
      }`}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="text-text-inverse font-bold text-sm font-heading">S</span>
          </div>
          <div>
            <div className="nav-copy font-heading font-bold text-text-primary text-sm leading-tight">SAHAYAK AI</div>
            <div className="nav-copy text-text-muted text-xs">Well-being monitoring</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1" aria-label="Officer navigation">
        {officerNavItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href || pathname.startsWith(item.href + "/")}
          />
        ))}
      </nav>

      {/* User chip */}
      <div className="px-3 pb-5 border-t border-border-subtle pt-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-subtle flex items-center justify-center text-xs font-bold text-brand-primary">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="nav-copy text-xs font-semibold text-text-primary truncate">{userName}</div>
            <div className="nav-copy text-xs text-text-muted truncate">{userRole} · {userLocation}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
