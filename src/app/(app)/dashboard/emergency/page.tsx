import { EmergencyProtocolCard } from "@/components/dashboard/emergency-protocol-card";

export default function EmergencyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Emergency Protocols</h1>
      <div className="max-w-2xl mx-auto">
        <EmergencyProtocolCard />
      </div>
    </div>
  );
}
