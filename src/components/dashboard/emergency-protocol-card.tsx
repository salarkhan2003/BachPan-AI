"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useConnectivity } from '@/contexts/connectivity-context';
import { mockClinics, mockFirstAidInstructions } from '@/lib/mock-data';
import type { Clinic } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

export function EmergencyProtocolCard() {
  const { isOnline } = useConnectivity();
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(false);
  const [emergencyType, setEmergencyType] = useState<keyof typeof mockFirstAidInstructions | null>(null);

  const nearbyClinics = mockClinics.slice(0, 1); // Simulate cached data for offline

  const handleEmergencyTrigger = (type: keyof typeof mockFirstAidInstructions) => {
    setEmergencyType(type);
    setShowEmergencyInfo(true);
    // Simulate SMS alert
    // In a real app, this would trigger an actual SMS via a backend or native capabilities.
    // For this demo, we'll use a toast notification (globally) or an alert here.
    // toast({ title: "Emergency Alert Triggered!", description: "SMS sent to emergency contacts (simulated)." });
  };

  const EmergencyInfoDialog = () => (
    <AlertDialog open={showEmergencyInfo} onOpenChange={setShowEmergencyInfo}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline flex items-center gap-2">
            <Icons.emergency className="h-6 w-6 text-destructive" />
            Emergency Protocol Activated: {emergencyType ? emergencyType.replace('_', ' ').toUpperCase() : ''}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Follow these instructions carefully. Emergency contacts have been notified (simulated).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="max-h-[50vh] p-1">
          <div className="space-y-4 p-3">
            {emergencyType && mockFirstAidInstructions[emergencyType] && (
              <div>
                <h4 className="font-semibold text-destructive mb-2">First-Aid Instructions:</h4>
                <ul className="list-decimal list-inside space-y-1 text-sm text-foreground">
                  {mockFirstAidInstructions[emergencyType].map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {!isOnline && nearbyClinics.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-destructive mb-2">Nearby Clinics (Offline Cache):</h4>
                {nearbyClinics.map((clinic: Clinic) => (
                  <div key={clinic.id} className="p-2 border rounded-md bg-muted/50">
                    <p className="font-medium text-sm">{clinic.name}</p>
                    <p className="text-xs text-muted-foreground">{clinic.address}</p>
                    <p className="text-xs text-muted-foreground">Phone: {clinic.phone}</p>
                  </div>
                ))}
              </div>
            )}
            {isOnline && (
               <div className="mt-4">
                <h4 className="font-semibold text-destructive mb-2">Nearby Clinics (Online):</h4>
                 <p className="text-sm text-muted-foreground">Fetching real-time clinic data... (simulated)</p>
                 {mockClinics.map((clinic: Clinic) => (
                  <div key={clinic.id} className="p-2 mt-1 border rounded-md bg-muted/50">
                    <p className="font-medium text-sm">{clinic.name}</p>
                    <p className="text-xs text-muted-foreground">{clinic.address} - Wait time: {clinic.waitTime}</p>
                    <p className="text-xs text-muted-foreground">Phone: {clinic.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setShowEmergencyInfo(false)}>Understood</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-destructive/50">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive">
          <Icons.emergency className="h-6 w-6" />
          <CardTitle className="font-headline">Emergency Protocol</CardTitle>
        </div>
        <CardDescription>
          In an emergency, select the situation. {isOnline ? "Online features active." : "Offline mode: SMS alerts and cached data."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium text-center">Select Emergency Type:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(Object.keys(mockFirstAidInstructions) as Array<keyof typeof mockFirstAidInstructions>).map((type) => (
            <Button
              key={type}
              variant="destructive"
              className="w-full justify-start gap-2"
              onClick={() => handleEmergencyTrigger(type)}
            >
              <Icons.firstAid className="h-4 w-4" />
              {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
            </Button>
          ))}
        </div>
         <p className="text-xs text-muted-foreground text-center mt-2">
          Simulates SMS to contacts & shows first-aid / clinic info.
        </p>
      </CardContent>
       <CardFooter className="border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
            <Icons.info className="h-4 w-4 mr-2 shrink-0" />
            <span>This is a simulation. In a real emergency, call your local emergency number.</span>
        </div>
      </CardFooter>
      <EmergencyInfoDialog />
    </Card>
  );
}
