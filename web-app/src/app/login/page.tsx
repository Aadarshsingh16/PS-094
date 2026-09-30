"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartHandshake, Landmark, Settings, Shield, User } from "lucide-react";
import { enterPortal, PORTAL_ROLES, type PortalRoleId } from "@/lib/roles";

const ROLE_ICONS = {
  victim: User,
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

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PORTAL_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.id];
              const tagMap: Record<string, { label: string; badgeCls: string; hoverBorder: string }> = {
                victim: {
                  label: "Survivor / Citizen Portal",
                  badgeCls: "bg-emerald-50 text-emerald-700 border-emerald-200",
                  hoverBorder: "hover:border-emerald-500",
                },
                counsellor: {
                  label: "Mental Health / Clinician",
                  badgeCls: "bg-purple-50 text-purple-700 border-purple-200",
                  hoverBorder: "hover:border-purple-500",
                },
                district: {
                  label: "District Authority / DLSA",
                  badgeCls: "bg-blue-50 text-blue-700 border-blue-200",
                  hoverBorder: "hover:border-blue-500",
                },
                administrator: {
                  label: "Audit & Governance",
                  badgeCls: "bg-slate-100 text-slate-700 border-slate-200",
                  hoverBorder: "hover:border-slate-500",
                },
              };

              const tag = tagMap[role.id] ?? {
                label: "Portal",
                badgeCls: "bg-slate-100 text-slate-700 border-slate-200",
                hoverBorder: "hover:border-brand-primary",
              };

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => openRole(role.id)}
                  className={`group flex flex-col items-start justify-between gap-4 rounded-2xl border border-border-default bg-bg-surface p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${tag.hoverBorder}`}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-subtle text-brand-primary">
                        <Icon size={20} strokeWidth={1.8} />
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-heading text-[11px] font-semibold ${tag.badgeCls}`}
                      >
                        {tag.label}
                      </span>
                    </div>
                    <span className="mt-3 block font-heading text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                      {role.title}
                    </span>
                    <span className="mt-1 block text-xs text-text-secondary leading-relaxed">
                      {role.description}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary group-hover:translate-x-0.5 transition-transform">
                    Enter portal →
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
