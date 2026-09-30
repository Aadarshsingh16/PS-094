import { VictimSideNav } from "@/components/atoms";

export default function VictimLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <VictimSideNav />
      <div className="victim-shell min-h-screen">{children}</div>
    </div>
  );
}
