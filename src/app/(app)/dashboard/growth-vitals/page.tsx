
import { MilestoneTrackerCard } from "@/components/dashboard/milestone-tracker-card";
import { ImmunizationAlertsCard } from "@/components/dashboard/immunization-alerts-card";
import { Icons } from "@/components/icons";

export default function GrowthVitalsPage() {
  return (
    <div className="container mx-auto py-8">
       <div className="flex items-center gap-2 mb-6">
        <Icons.realTime className="h-7 w-7 text-primary" />
        <h1 id="growth-vitals-heading" className="text-3xl font-bold font-headline text-foreground">
          Growth & Vitals
        </h1>
      </div>
      <p className="mb-6 text-muted-foreground">
        Track your baby's developmental milestones, immunization schedule, and other vital information.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MilestoneTrackerCard />
        <ImmunizationAlertsCard />
        {/* Placeholder for future Vitals Logging Card if needed */}
      </div>
    </div>
  );
}
