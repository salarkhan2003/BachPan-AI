
import { MilestoneTrackerCard } from "@/components/dashboard/milestone-tracker-card";
import { ImmunizationAlertsCard } from "@/components/dashboard/immunization-alerts-card";
import { Icons } from "@/components/icons"; // Corrected import path

export default function GrowthVitalsPage() { // Renamed function
  return (
    <div className="container mx-auto py-8">
       <div className="flex items-center gap-2 mb-6">
        <Icons.realTime className="h-7 w-7 text-primary" /> {/* Changed icon */}
        <h1 id="growth-vitals-heading" className="text-3xl font-bold font-headline text-foreground">
          Growth & Vitals {/* Renamed title */}
        </h1>
      </div>
      <p className="mb-6 text-muted-foreground">
        Track your baby's developmental milestones, immunization schedule, and other vital information.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MilestoneTrackerCard />
        <ImmunizationAlertsCard />
        {/* Placeholder for future Vitals Logging Card */}
        {/* 
        <Card>
          <CardHeader>
            <CardTitle>Vitals Log (Coming Soon)</CardTitle>
            <CardDescription>Manually log weight, height, temperature etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This feature will allow you to track key vital signs over time.</p>
          </CardContent>
        </Card>
        */}
      </div>
    </div>
  );
}
