import { VaccineStockCard } from "./vaccine-stock-card";
import { ClinicWaitTimesCard } from "./clinic-wait-times-card";
import { AqiCard } from "./aqi-card";
import { Icons } from "../icons";

export function RealTimeUpdatesSection() {
  return (
    <section aria-labelledby="real-time-updates-heading">
      <div className="flex items-center gap-2 mb-4">
        <Icons.realTime className="h-6 w-6 text-primary" />
        <h2 id="real-time-updates-heading" className="text-2xl font-semibold font-headline text-foreground">
          Real-Time Updates
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VaccineStockCard />
        <ClinicWaitTimesCard />
        <AqiCard />
      </div>
    </section>
  );
}
