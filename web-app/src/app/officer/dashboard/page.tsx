"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PORTAL_ROLES } from "@/lib/roles";

export default function OfficerPortalEntryPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("role") ?? "";
    const fromQuery = new URLSearchParams(window.location.search).get("role") ?? "";
    setRole(stored || fromQuery);
  }, []);

  const match = PORTAL_ROLES.find((item) => item.id === role);
  const title = match?.title ?? "Officer portal";

  return (
    <main className="min-h-screen bg-bg-primary px-8 py-10 text-text-primary">
      <p className="text-sm font-medium text-brand-primary">Portal entry</p>
      <h1 className="mt-2 font-heading text-heading-xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Role stored for this session{role ? `: ${role}` : ""}.
      </p>
      <Link href="/login" className="mt-6 inline-block text-sm font-medium text-brand-primary">
        Back to role selection
      </Link>
    </main>
  );
}
