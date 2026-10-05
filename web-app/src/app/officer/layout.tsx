import { OfficerSideNav } from "@/components/atoms";
import { OfficerPhoneChrome } from "@/components/molecules/PhoneChrome";

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <OfficerSideNav />
      <OfficerPhoneChrome />
      <div className="officer-shell min-h-screen">{children}</div>
    </div>
  );
}
