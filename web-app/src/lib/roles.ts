export type PortalRoleId =
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
    id: "district",
    title: "District Officer",
    description: "Coordinate well-being monitoring across assigned cases.",
    href: "/officer/dashboard?role=district",
  },
  {
    id: "counsellor",
    title: "Counsellor / Mental Health Professional",
    description: "Review distress signals and recommend support. A person decides.",
    href: "/officer/dashboard",
  },
  {
    id: "responder",
    title: "Responder / Protection Officer",
    description: "Respond to safety alerts that need a human check.",
    href: "/officer/dashboard",
  },
  {
    id: "administrator",
    title: "Administrator",
    description: "Manage portal settings for this prototype.",
    href: "/admin/settings",
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
