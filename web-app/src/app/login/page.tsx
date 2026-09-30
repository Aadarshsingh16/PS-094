"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartHandshake, Landmark, Settings, Shield } from "lucide-react";
import { enterPortal, PORTAL_ROLES, type PortalRoleId } from "@/lib/roles";

const ROLE_ICONS = {
  district: Landmark,
  counsellor: HeartHandshake,
  responder: Shield,
  administrator: Settings,
} as const;

const LANGUAGES = ["English", "Hindi", "Regional"] as const;

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>("English");

  function openRole(roleId: PortalRoleId) {
    router.push(enterPortal(roleId, name, language));
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary">
              <span className="font-heading text-sm font-bold text-text-inverse">S</span>
            </div>
            <span className="font-heading text-sm font-bold">SAHAYAK AI</span>
          </div>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Language
            <select
              aria-label="Language"
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as (typeof LANGUAGES)[number])
              }
              className="rounded-xl border border-border-default bg-bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              {LANGUAGES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </header>

        <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-10">
          <h1 className="font-heading text-display-2xl font-bold text-text-primary">
            SAHAYAK AI
          </h1>
          <p className="mt-2 text-body-lg text-text-secondary">Your safe space</p>
          <p className="mt-3 max-w-xl text-sm text-text-muted">
            Choose a role to enter the prototype. Any name is accepted. No sign-in is required.
          </p>

          <label className="mt-8 block max-w-sm text-sm font-medium text-text-secondary">
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="mt-1.5 w-full rounded-xl border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </label>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PORTAL_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.id];
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => openRole(role.id)}
                  className="flex flex-col items-start gap-3 rounded-2xl border border-border-default bg-bg-surface p-5 text-left shadow-sm transition-colors duration-200 hover:border-brand-primary"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-subtle text-brand-primary">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="font-heading text-base font-bold text-text-primary">
                    {role.title}
                  </span>
                  <span className="text-sm text-text-secondary">{role.description}</span>
                  <span className="text-sm font-medium text-brand-primary">Enter portal →</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
