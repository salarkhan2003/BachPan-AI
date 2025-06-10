
import { VoiceTriageCard } from "@/components/dashboard/voice-triage-card"; // Will be CryAnalyzerCard
import { RashScannerCard } from "@/components/dashboard/rash-scanner-card"; // Will be SmartVisionCard
import { EmergencyProtocolCard } from "@/components/dashboard/emergency-protocol-card";
import { RealTimeUpdatesSection } from "@/components/dashboard/real-time-updates-section";
import { CommunityTipsFeed } from "@/components/dashboard/community-tips-feed";
import { HealthAlertsSection } from "@/components/dashboard/health-alerts-section"; // Will be GrowthVitalsSection
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // For new AI Advisor Card

// TODO: Create these new card components or adapt existing ones.
// For now, the dashboard will show old cards that will be updated later.

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-2">
      <Alert className="mb-6 bg-primary/10 border-primary/30">
        <Icons.baby className="h-5 w-5 text-primary" />
        <AlertTitle className="font-headline text-primary">Welcome to BachpanAI!</AlertTitle>
        <AlertDescription>
          Your AI-powered baby care companion. Explore features below to monitor and get advice for your little one.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* These will be updated to CryAnalyzerCard and SmartVisionCard. Placeholder for AI Advisor */}
        <VoiceTriageCard /> {/* To become CryAnalyzerCard */}
        <RashScannerCard /> {/* To become SmartVisionCard */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icons.messages className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">AI Pediatric Advisor</CardTitle>
            </div>
            <CardDescription>Get answers to your baby care questions from our AI assistant.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Ask about feeding, sleep, ailments, and more. Click to open the advisor.</p>
          </CardContent>
        </Card>

      </div>
      
      {/* EmergencyProtocolCard can remain if desired, or be part of a different section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <EmergencyProtocolCard />
         {/* Add more cards if needed, or adjust layout */}
      </div>


      <Separator className="my-8" />

      <RealTimeUpdatesSection /> {/* This section contains AQI, Clinic Wait Times, Vaccine Stock. Could be part of "Growth & Vitals" or "Environment" */}

      <Separator className="my-8" />

      <CommunityTipsFeed />

      <Separator className="my-8" />
      
      <HealthAlertsSection /> {/* This will become the Growth & Vitals section */}
    </div>
  );
}
