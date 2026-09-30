import { OfficerSideNav } from "@/components/atoms";

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <OfficerSideNav />
      <div className="officer-shell min-h-screen">{children}</div>
    </div>
  );
}
