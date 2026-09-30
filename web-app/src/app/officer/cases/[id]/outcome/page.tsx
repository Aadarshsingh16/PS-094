import cases from "@/data/cases.json";
import { OutcomeView } from "./OutcomeView";

export function generateStaticParams() {
  return cases.map((item) => ({ id: item.caseId.toLowerCase() }));
}

export default async function OutcomePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OutcomeView caseKey={id} />;
}
