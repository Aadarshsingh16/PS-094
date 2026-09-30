import cases from "@/data/cases.json";
import { CaseDetail } from "./CaseDetail";

export function generateStaticParams() {
  return cases.map((item) => ({ id: item.caseId.toLowerCase() }));
}

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CaseDetail caseKey={id} />;
}
