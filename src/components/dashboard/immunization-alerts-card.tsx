
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { mockImmunizationAlerts } from "@/lib/mock-data";
import type { ImmunizationAlert } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { useToast } from '@/hooks/use-toast'; // Added useToast

export function ImmunizationAlertsCard() {
  const { toast } = useToast(); // Initialize toast

  const getStatusColor = (status: ImmunizationAlert['status']): string => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-500 hover:bg-blue-600';
      case 'Due': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Overdue': return 'bg-red-500 hover:bg-red-600';
      case 'Completed': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleViewFullSchedule = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Viewing the full immunization schedule will be available in a future update.",
    });
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icons.immunization className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-lg">Immunization Alerts</CardTitle>
        </div>
        <CardDescription>Stay up-to-date with your baby's vaccination schedule.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <ScrollArea className="h-[260px] pr-3">
          <ul className="space-y-3">
            {mockImmunizationAlerts.map((alert) => (
              <li key={alert.id} className="p-3 rounded-md border bg-background hover:bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{alert.vaccineName}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(alert.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={`text-xs text-white ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </Badge>
                </div>
                {alert.notes && <p className="text-xs text-muted-foreground mt-1">Notes: {alert.notes}</p>}
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button variant="outline" size="sm" className="w-full mt-3" onClick={handleViewFullSchedule}>
            <Icons.listChecks className="mr-2 h-4 w-4"/> View Full Schedule
        </Button>
      </CardContent>
    </Card>
  );
}
