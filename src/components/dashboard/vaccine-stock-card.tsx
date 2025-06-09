
"use client";

import { useState, useEffect } from 'react'; // Added useState and useEffect
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { mockVaccineStock } from "@/lib/mock-data";
import type { VaccineStock } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConnectivity } from "@/contexts/connectivity-context";

export function VaccineStockCard() {
  const { isOnline } = useConnectivity();
  
  const dataToShow = isOnline 
    ? mockVaccineStock 
    : mockVaccineStock.slice(0,2).map(v => ({
        ...v, 
        availability: "Low Stock" as const, 
        lastUpdated: "Offline data (may be outdated)" 
      }));

  const [formattedTimes, setFormattedTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOnline) {
      const newFormattedTimes: Record<string, string> = {};
      // Iterate over the source mockVaccineStock for online data
      mockVaccineStock.forEach(vaccine => {
        try {
          // Ensure vaccine.lastUpdated is a valid date string before parsing
          newFormattedTimes[vaccine.id] = new Date(vaccine.lastUpdated).toLocaleTimeString();
        } catch (e) {
          console.error("Error formatting date for vaccine:", vaccine.id, vaccine.lastUpdated, e);
          newFormattedTimes[vaccine.id] = "Invalid date"; // Fallback for invalid date
        }
      });
      setFormattedTimes(newFormattedTimes);
    }
    // No need to explicitly clear/set for offline as `dataToShow` handles the offline display string
  }, [isOnline]); // Rerun when isOnline changes (and on initial client mount)


  const getBadgeVariant = (availability: VaccineStock['availability']) => {
    switch (availability) {
      case 'In Stock': return 'default'; 
      case 'Low Stock': return 'secondary'; 
      case 'Out of Stock': return 'destructive';
      default: return 'outline';
    }
  };


  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icons.vaccine className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-lg">Vaccine Stock</CardTitle>
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
            {dataToShow.map((vaccine) => (
              <li key={vaccine.id} className="flex justify-between items-center p-2 rounded-md border bg-background hover:bg-secondary/30 transition-colors">
                <div>
                  <p className="font-medium text-sm">{vaccine.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {isOnline 
                      ? `Last updated: ${formattedTimes[vaccine.id] || "Loading..."}` 
                      : vaccine.lastUpdated /* This is already "Offline data (may be outdated)" */
                    }
                  </p>
                </div>
                <Badge variant={getBadgeVariant(vaccine.availability)} className="text-xs">
                  {vaccine.availability}
                </Badge>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

