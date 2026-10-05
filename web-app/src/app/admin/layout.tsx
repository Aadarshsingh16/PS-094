"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminPhoneChrome } from "@/components/molecules/PhoneChrome";

const LINKS = [
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/audit", label: "Audit logs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="border-b border-border-subtle px-8 py-4">
        <p className="font-heading text-sm font-bold text-text-primary">SAHAYAK AI · Administrator</p>
        <nav className="admin-nav mt-3 flex gap-2" aria-label="Administrator">
          {LINKS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium ${active ? "bg-nav-active text-brand-primary" : "text-text-secondary"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <AdminPhoneChrome />
      <div className="admin-shell">{children}</div>
    </div>
  );
}
