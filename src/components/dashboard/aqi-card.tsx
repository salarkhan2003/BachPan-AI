"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { mockAqiData } from "@/lib/mock-data";
import type { AqiData } from "@/lib/types";
import { useConnectivity } from "@/contexts/connectivity-context";

export function AqiCard() {
  const { isOnline } = useConnectivity();
  // Show limited or stale data when offline
  const displayedAqiData = isOnline ? mockAqiData[0] : {...mockAqiData[0], aqi: mockAqiData[0].aqi - 10, level: "Moderate", recommendation: "Connect to internet for latest AQI."};


  const getAqiColor = (level: AqiData['level']): string => {
    switch (level) {
      case 'Good': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'Unhealthy for Sensitive Groups': return 'text-orange-600';
      case 'Unhealthy': return 'text-red-600';
      case 'Very Unhealthy': return 'text-purple-600';
      case 'Hazardous': return 'text-maroon-800'; // Tailwind doesn't have maroon, use a dark red
      default: return 'text-muted-foreground';
    }
  };
  const getAqiBgColor = (level: AqiData['level']): string => {
    switch (level) {
      case 'Good': return 'bg-green-100';
      case 'Moderate': return 'bg-yellow-100';
      case 'Unhealthy for Sensitive Groups': return 'bg-orange-100';
      case 'Unhealthy': return 'bg-red-100';
      case 'Very Unhealthy': return 'bg-purple-100';
      case 'Hazardous': return 'bg-red-200';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icons.aqi className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-lg">Local AQI</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
         {!isOnline && (
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Icons.offline className="h-3 w-3" /> Showing potentially outdated data.
          </p>
        )}
        <div className={`p-4 rounded-lg ${getAqiBgColor(displayedAqiData.level)}`}>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-foreground">{displayedAqiData.city}</p>
            <p className={`text-3xl font-bold ${getAqiColor(displayedAqiData.level)}`}>{displayedAqiData.aqi}</p>
          </div>
          <p className={`text-sm font-semibold mt-1 ${getAqiColor(displayedAqiData.level)}`}>{displayedAqiData.level}</p>
        </div>
        <p className="text-xs text-muted-foreground">{displayedAqiData.recommendation}</p>
      </CardContent>
    </Card>
  );
}
