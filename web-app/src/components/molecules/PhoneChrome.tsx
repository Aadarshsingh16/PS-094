"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Briefcase,
  ClipboardList,
  Heart,
  Home,
  LayoutDashboard,
  MoreHorizontal,
  Settings,
  Users,
  X,
} from "lucide-react";
import { QuickExit } from "@/components/atoms/QuickExit";

interface TabItem {
  href: string;
  label: string;
  icon: typeof Home;
}

interface MoreItem {
  href: string;
  label: string;
}

function matches(pathname: string, href: string) {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const target = href.length > 1 && href.endsWith("/") ? href.slice(0, -1) : href;
  return path === target || path.startsWith(`${target}/`);
}

export function PhoneChrome({
  title,
  tabs,
  more,
  showExit = false,
}: {
  title: string;
  tabs: TabItem[];
  more: MoreItem[];
  showExit?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const moreActive = more.some((item) => matches(pathname, item.href));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="phone-only phone-top">
        <span className="font-heading text-sm font-bold text-text-primary">{title}</span>
        {showExit ? <QuickExit compact /> : null}
      </header>
      {open ? (
        <div className="phone-only phone-sheet">
          <button type="button" className="phone-sheet-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="phone-sheet-panel" role="dialog" aria-label="More">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-heading text-base font-bold text-text-primary">More</p>
              <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="rounded-full p-2 text-text-secondary">
                <X size={18} />
              </button>
            </div>
            <ul className="space-y-1">
              {more.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-3 py-3 text-sm font-medium ${
                      matches(pathname, item.href) ? "bg-nav-active text-brand-primary" : "text-text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      <nav className="phone-only phone-tabs" aria-label="Sections">
        {tabs.map((item) => {
          const active = !moreActive && matches(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`phone-tab ${active ? "text-brand-primary" : "text-text-muted"}`}>
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {more.length > 0 ? (
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className={`phone-tab ${moreActive || open ? "text-brand-primary" : "text-text-muted"}`}
          >
            <MoreHorizontal size={20} />
            <span>More</span>
          </button>
        ) : null}
      </nav>
    </>
  );
}

export function VictimPhoneChrome() {
  return (
    <PhoneChrome
      title="SAHAYAK"
      showExit
      tabs={[
        { href: "/victim/home", label: "Home", icon: Home },
        { href: "/victim/checkin", label: "Check-in", icon: ClipboardList },
        { href: "/victim/support", label: "Support", icon: Heart },
        { href: "/victim/mycase", label: "Case", icon: Briefcase },
      ]}
      more={[{ href: "/victim/privacy", label: "Privacy & channels" }]}
    />
  );
}

export function OfficerPhoneChrome() {
  return (
    <PhoneChrome
      title="SAHAYAK AI"
      tabs={[
        { href: "/officer/dashboard", label: "Home", icon: LayoutDashboard },
        { href: "/officer/cases", label: "Cases", icon: Users },
        { href: "/officer/alerts", label: "Alerts", icon: Bell },
        { href: "/officer/interventions", label: "Support", icon: Activity },
      ]}
      more={[
        { href: "/officer/reports", label: "Reports" },
        { href: "/officer/settings", label: "Settings" },
        { href: "/officer/cases/new", label: "Register case" },
      ]}
    />
  );
}

export function AdminPhoneChrome() {
  return (
    <PhoneChrome
      title="Administrator"
      tabs={[
        { href: "/admin/settings", label: "Settings", icon: Settings },
        { href: "/admin/audit", label: "Audit", icon: ClipboardList },
      ]}
      more={[]}
    />
  );
}
