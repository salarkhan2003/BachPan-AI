
import { EmergencyProtocolCard } from "@/components/dashboard/emergency-protocol-card";
import { Icons } from "@/components/icons";

export default function EmergencyPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Icons.emergency className="h-7 w-7 text-primary" /> {/* Icon for Emergency Protocols */}
        <h1 className="text-3xl font-bold font-headline">Emergency Protocols</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <EmergencyProtocolCard />
      </div>
    </div>
  );
}
