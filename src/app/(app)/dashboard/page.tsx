import { VoiceTriageCard } from "@/components/dashboard/voice-triage-card";
import { RashScannerCard } from "@/components/dashboard/rash-scanner-card";
import { EmergencyProtocolCard } from "@/components/dashboard/emergency-protocol-card";
import { RealTimeUpdatesSection } from "@/components/dashboard/real-time-updates-section";
import { CommunityTipsFeed } from "@/components/dashboard/community-tips-feed";
import { HealthAlertsSection } from "@/components/dashboard/health-alerts-section";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-2">
      <Alert className="mb-6 bg-primary/10 border-primary/30">
        <Icons.baby className="h-5 w-5 text-primary" />
        <AlertTitle className="font-headline text-primary">Welcome to PulseCare AI!</AlertTitle>
        <AlertDescription>
          Your intelligent companion for navigating the first 1,000 days of your child's life. Explore features below.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <VoiceTriageCard />
        <RashScannerCard />
        <EmergencyProtocolCard />
      </div>

      <Separator className="my-8" />

      <RealTimeUpdatesSection />

      <Separator className="my-8" />

      <CommunityTipsFeed />

      <Separator className="my-8" />
      
      <HealthAlertsSection />
    </div>
  );
}
