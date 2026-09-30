"use client";

import { useState } from "react";
import { Globe, LifeBuoy, MessageSquare, Phone, Smartphone, Bot } from "lucide-react";
import { SectionHeader, StatusToggle } from "@/components/atoms";
import privacyData from "@/data/privacy.json";

const CHANNEL_ICONS = {
  sms: MessageSquare,
  ivrs: Phone,
  chatbot: Bot,
  mobile: Smartphone,
  web: Globe,
  helpline: LifeBuoy,
} as const;

export default function PrivacyPage() {
  const [channels, setChannels] = useState(privacyData.channels);
  const [days, setDays] = useState(privacyData.activeDayIndexes);
  const [viewers, setViewers] = useState(privacyData.viewers);
  const [discreet, setDiscreet] = useState(privacyData.discreet);

  return (
    <main className="px-8 py-8">
      <SectionHeader title={privacyData.title} subtitle={privacyData.subtitle} />
      <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-6">
        <div className="grid grid-cols-2 gap-4">
          {channels.map((channel) => {
            const Icon = CHANNEL_ICONS[channel.id as keyof typeof CHANNEL_ICONS];
            return (
              <article
                key={channel.id}
                className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-subtle text-brand-primary">
                    <Icon size={18} />
                  </span>
                  <StatusToggle
                    id={`channel-${channel.id}`}
                    checked={channel.enabled}
                    onChange={(checked) =>
                      setChannels((current) =>
                        current.map((item) =>
                          item.id === channel.id ? { ...item, enabled: checked } : item,
                        ),
                      )
                    }
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-base font-bold text-text-primary">{channel.title}</h2>
                  {channel.preferred ? (
                    <span className="rounded-full bg-brand-subtle px-2 py-0.5 text-xs font-semibold text-brand-primary">
                      Preferred
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-text-secondary">{channel.description}</p>
              </article>
            );
          })}
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
            <h2 className="font-heading text-base font-bold text-text-primary">Safe times to reach me</h2>
            <div className="mt-4 flex gap-2">
              {privacyData.days.map((label, index) => {
                const active = days.includes(index);
                return (
                  <button
                    key={`${label}-${index}`}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setDays((current) =>
                        current.includes(index)
                          ? current.filter((item) => item !== index)
                          : [...current, index],
                      )
                    }
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
                      active
                        ? "bg-brand-primary text-text-inverse"
                        : "border border-border-default text-text-secondary"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 font-heading text-2xl font-bold text-text-primary">{privacyData.safeTime}</p>
          </section>

          <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
            <h2 className="font-heading text-base font-bold text-text-primary">Who can see my answers</h2>
            <ul className="mt-4 space-y-4">
              {viewers.map((viewer) => (
                <li key={viewer.id} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{viewer.label}</p>
                    <p className="text-xs text-text-muted">{viewer.detail}</p>
                  </div>
                  <StatusToggle
                    id={`viewer-${viewer.id}`}
                    checked={viewer.enabled}
                    onChange={(checked) =>
                      setViewers((current) =>
                        current.map((item) =>
                          item.id === viewer.id ? { ...item, enabled: checked } : item,
                        ),
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-bg-accent-subtle p-5">
            <h2 className="font-heading text-base font-bold text-text-primary">Discreet mode</h2>
            <ul className="mt-4 space-y-4">
              {discreet.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3">
                  <p className="text-sm text-text-primary">{item.label}</p>
                  <StatusToggle
                    id={`discreet-${item.id}`}
                    checked={item.enabled}
                    onChange={(checked) =>
                      setDiscreet((current) =>
                        current.map((entry) =>
                          entry.id === item.id ? { ...entry, enabled: checked } : entry,
                        ),
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
