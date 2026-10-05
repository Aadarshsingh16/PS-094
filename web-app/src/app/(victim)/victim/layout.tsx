import { VictimSideNav } from "@/components/atoms";
import { VictimPhoneChrome } from "@/components/molecules/PhoneChrome";

export default function VictimLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <VictimSideNav />
      <VictimPhoneChrome />
      <div className="victim-shell min-h-screen">{children}</div>
    </div>
  );
}
