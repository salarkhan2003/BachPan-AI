"use client";

import { useState, useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useConnectivity } from '@/contexts/connectivity-context';
import { voiceTriage, VoiceTriageInput } from '@/ai/flows/voice-triage';
import type { VoiceTriageOutput } from '@/ai/flows/voice-triage';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';

export function VoiceTriageCard() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState<VoiceTriageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { isOnline } = useConnectivity();

  const handleSubmit = async () => {
    if (!symptom.trim()) {
      setError("Please describe the symptom.");
      return;
    }
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const input: VoiceTriageInput = { symptom, isOnline };
        const response = await voiceTriage(input);
        setResult(response);
      } catch (e) {
        setError("Failed to get triage advice. Please try again.");
        console.error(e);
      }
    });
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icons.voiceTriage className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Voice Triage</CardTitle>
        </div>
        <CardDescription>Describe your baby's symptoms using your voice (simulated via text input) for AI-powered advice.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="symptom-description" className="text-sm font-medium">Symptom Description (Simulated Voice Input)</Label>
          <Textarea
            id="symptom-description"
            placeholder="e.g., 'My baby has a high fever and is coughing a lot.'"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="mt-1 min-h-[80px]"
            disabled={isPending}
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <Icons.warning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isPending && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
        {result && (
          <div className="space-y-4 rounded-md border p-4 bg-secondary/30">
            <h4 className="font-semibold text-foreground">Triage Advice ({result.analysisDepth} analysis):</h4>
            <div>
              <p className="font-medium text-sm">Potential Causes:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                {result.potentialCauses.map((cause, index) => <li key={index}>{cause}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm">Recommended Actions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                {result.recommendedActions.map((action, index) => <li key={index}>{action}</li>)}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isPending || !symptom.trim()} className="w-full">
          {isPending ? (
            <>
              <Icons.settings className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Icons.send className="mr-2 h-4 w-4" />
              Get Advice
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
