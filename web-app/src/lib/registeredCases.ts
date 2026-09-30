const KEY = "registeredCases";

export interface RegisteredCase {
  caseId: string;
  category: string;
  stage: string;
  consent: boolean;
  safeChannel: string;
}

function isRegisteredCase(value: unknown): value is RegisteredCase {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.caseId === "string" &&
    typeof item.category === "string" &&
    typeof item.stage === "string" &&
    typeof item.consent === "boolean" &&
    typeof item.safeChannel === "string"
  );
}

export function readRegisteredCases(): RegisteredCase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRegisteredCase);
  } catch {
    return [];
  }
}

export function saveRegisteredCase(entry: RegisteredCase) {
  const current = readRegisteredCases().filter((item) => item.caseId !== entry.caseId);
  sessionStorage.setItem(KEY, JSON.stringify([entry, ...current]));
}
