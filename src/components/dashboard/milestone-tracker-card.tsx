
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { mockMilestones } from "@/lib/mock-data";
import type { Milestone } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useToast } from '@/hooks/use-toast'; // Added useToast

export function MilestoneTrackerCard() {
  const [milestones, setMilestones] = useState<Milestone[]>(mockMilestones);
  const { toast } = useToast(); // Initialize toast

  const toggleMilestone = (id: string) => {
    setMilestones(prev =>
      prev.map(m =>
        m.id === id ? { ...m, achieved: !m.achieved, dateAchieved: !m.achieved ? new Date().toISOString() : undefined } : m
      )
    );
  };
  
  const achievedCount = milestones.filter(m => m.achieved).length;
  const progressPercentage = (achievedCount / milestones.length) * 100;

  const handleViewAllMilestones = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Viewing all milestones will be available in a future update.",
    });
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icons.milestone className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-lg">Milestone Tracker</CardTitle>
        </div>
        <CardDescription>Track your baby's developmental milestones.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
            <Label htmlFor="milestone-progress" className="text-sm whitespace-nowrap">Progress:</Label>
            <Progress value={progressPercentage} id="milestone-progress" className="w-full h-2" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">{achievedCount} / {milestones.length}</span>
        </div>
        <ScrollArea className="h-[220px] pr-3">
          <ul className="space-y-3">
            {milestones.map((milestone) => (
              <li key={milestone.id} className={`p-3 rounded-md border transition-all duration-300 ${milestone.achieved ? 'bg-green-500/10 border-green-500/30' : 'bg-background hover:bg-secondary/30'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`font-medium text-sm ${milestone.achieved ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-xs text-muted-foreground">Expected around {milestone.ageMonths} months</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`milestone-${milestone.id}`}
                      checked={milestone.achieved}
                      onCheckedChange={() => toggleMilestone(milestone.id)}
                      aria-label={`Mark ${milestone.title} as ${milestone.achieved ? 'not achieved' : 'achieved'}`}
                    />
                     <Label htmlFor={`milestone-${milestone.id}`} className="text-xs cursor-pointer select-none">
                        {milestone.achieved ? 'Achieved' : 'Mark Done'}
                     </Label>
                  </div>
                </div>
                {milestone.achieved && milestone.dateAchieved && (
                  <p className="text-xs text-green-600 mt-1">Achieved on: {new Date(milestone.dateAchieved).toLocaleDateString()}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button variant="outline" size="sm" className="w-full mt-3" onClick={handleViewAllMilestones}>
            <Icons.info className="mr-2 h-4 w-4"/> View All Milestones
        </Button>
      </CardContent>
    </Card>
  );
}
