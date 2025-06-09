import { MilestoneTrackerCard } from "./milestone-tracker-card";
import { ImmunizationAlertsCard } from "./immunization-alerts-card";
import { Icons } from "../icons";

export function HealthAlertsSection() {
  return (
    <section aria-labelledby="health-alerts-heading">
       <div className="flex items-center gap-2 mb-4">
        <Icons.alerts className="h-6 w-6 text-primary" />
        <h2 id="health-alerts-heading" className="text-2xl font-semibold font-headline text-foreground">
          Health & Development Alerts
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MilestoneTrackerCard />
        <ImmunizationAlertsCard />
      </div>
    </section>
  );
}
