
import { MilestoneTrackerCard } from "./milestone-tracker-card";
import { ImmunizationAlertsCard } from "./immunization-alerts-card";
import { Icons } from "../icons";

// This section will now be titled "Growth & Vitals" on the dashboard page
export function HealthAlertsSection() { // Function name can remain, but its usage on dashboard implies new title
  return (
    <section aria-labelledby="growth-vitals-heading">
       <div className="flex items-center gap-2 mb-4">
        <Icons.realTime className="h-6 w-6 text-primary" /> {/* Changed icon */}
        <h2 id="growth-vitals-heading" className="text-2xl font-semibold font-headline text-foreground">
          Growth & Vitals {/* Renamed title */}
        </h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Monitor your baby's development milestones and immunization schedule.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MilestoneTrackerCard />
        <ImmunizationAlertsCard />
      </div>
    </section>
  );
}
