export type PortalRoleId =
  | "victim"
  | "district"
  | "counsellor"
  | "responder"
  | "administrator";

export interface PortalRole {
  id: PortalRoleId;
  title: string;
  description: string;
  href: string;
}

export const PORTAL_ROLES: PortalRole[] = [
  {
    id: "victim",
    title: "Asha (Victim Portal)",
    description: "Threatened Witness · Safe daily check-in, private case journey & 1-tap support.",
    href: "/victim/home",
  },
  {
    id: "counsellor",
    title: "Counsellor Portal (Priya Sharma)",
    description: "Clinical triage · Review distress signals, explainable risk factors & human review.",
    href: "/officer/dashboard",
  },
  {
    id: "district",
    title: "District Authority (Reports & SLA)",
    description: "Macro oversight · District distress trajectory, SLA compliance & caseload distribution.",
    href: "/officer/reports",
  },
  {
    id: "administrator",
    title: "Administrator (Governance & Audit)",
    description: "Accountability · Tamper-evident audit trail, AI vs. human decision logs & settings.",
    href: "/admin/audit",
  },
];

export function enterPortal(roleId: PortalRoleId, name: string, language: string) {
  const role = PORTAL_ROLES.find((item) => item.id === roleId);
  if (!role) return "/login";

  sessionStorage.setItem("role", role.id);
  sessionStorage.setItem("language", language);
  sessionStorage.setItem("displayName", name.trim());
  return role.href;
}
