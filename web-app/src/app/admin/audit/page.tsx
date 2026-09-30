import { SectionHeader } from "@/components/atoms";
import audit from "@/data/audit.json";

export default function AuditLogPage() {
  return (
    <main className="px-8 py-8">
      <SectionHeader
        title="Audit logs"
        subtitle="Governance record for Case #USR-7844. A person can review what changed."
      />
      <div className="overflow-hidden rounded-2xl border border-border-default bg-bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-text-muted">
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Subject</th>
            </tr>
          </thead>
          <tbody>
            {audit.map((item) => (
              <tr key={`${item.time}-${item.event}`} className="border-t border-border-subtle">
                <td className="px-4 py-3 font-heading font-bold text-text-primary">{item.time}</td>
                <td className="px-4 py-3 text-text-primary">{item.event}</td>
                <td className="px-4 py-3 text-text-secondary">{item.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
