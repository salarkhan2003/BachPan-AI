"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { mockClinics } from "@/lib/mock-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConnectivity } from "@/contexts/connectivity-context";

export function ClinicWaitTimesCard() {
  const { isOnline } = useConnectivity();
  const dataToShow = isOnline ? mockClinics : mockClinics.slice(0,1).map(c => ({...c, waitTime: "N/A (Offline)"}));

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icons.clinic className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-lg">Clinic Wait Times</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {!isOnline && (
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Icons.offline className="h-3 w-3" /> Showing cached data. Connect for live updates.
          </p>
        )}
        <ScrollArea className="h-[180px] pr-3">
          <ul className="space-y-3">
            {dataToShow.map((clinic) => (
              <li key={clinic.id} className="p-3 rounded-md border bg-background hover:bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{clinic.name}</p>
                  <span className="text-xs font-semibold text-primary whitespace-nowrap">
                    {clinic.waitTime}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{clinic.address}</p>
                {isOnline && <p className="text-xs text-muted-foreground">Services: {clinic.services.join(', ')}</p>}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
