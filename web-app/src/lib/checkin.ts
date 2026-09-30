export interface StoredAnswer {
  questionId: string;
  value: string;
}

const STORAGE_KEY = "checkinAnswers";

function isStoredAnswer(value: unknown): value is StoredAnswer {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.questionId === "string" && typeof record.value === "string";
}

export function saveCheckinAnswers(answers: StoredAnswer[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function readCheckinAnswers(): StoredAnswer[] {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredAnswer);
  } catch {
    return [];
  }
}
