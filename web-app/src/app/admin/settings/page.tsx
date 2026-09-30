"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminSettingsEntryPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(sessionStorage.getItem("role") ?? "");
  }, []);

  return (
    <main className="min-h-screen bg-bg-primary px-8 py-10 text-text-primary">
      <p className="text-sm font-medium text-brand-primary">Portal entry</p>
      <h1 className="mt-2 font-heading text-heading-xl font-bold">Administrator</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Role stored for this session{role ? `: ${role}` : ""}.
      </p>
      <Link href="/login" className="mt-6 inline-block text-sm font-medium text-brand-primary">
        Back to role selection
      </Link>
    </main>
  );
}
