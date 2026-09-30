import alerts from "@/data/alerts.json";
import { AlertDetail } from "./AlertDetail";

export function generateStaticParams() {
  return alerts.map((item) => ({ id: item.id }));
}

export default async function AlertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AlertDetail alertId={id} />;
}
