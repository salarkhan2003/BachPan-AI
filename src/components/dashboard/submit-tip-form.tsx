"use client";

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useConnectivity } from '@/contexts/connectivity-context';
import { categorizeCommunityTip, CategorizeCommunityTipInput } from '@/ai/flows/community-tip-categorization';
import type { CategorizedTipResult } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '@/hooks/use-toast';

const tipSchema = z.object({
  tipText: z.string().min(10, "Tip must be at least 10 characters long.").max(500, "Tip cannot exceed 500 characters."),
  location: z.string().min(2, "Location is required.").max(50, "Location name too long."),
});

type TipFormValues = z.infer<typeof tipSchema>;

interface SubmitTipFormProps {
  onTipSubmitted: (newTip: TipFormValues & Partial<CategorizedTipResult>) => void;
}

export function SubmitTipForm({ onTipSubmitted }: SubmitTipFormProps) {
  const [categorizedResult, setCategorizedResult] = useState<CategorizedTipResult | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, startSubmitting] = useTransition();
  const { isOnline } = useConnectivity();
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TipFormValues>({
    resolver: zodResolver(tipSchema),
  });

  const onSubmit: SubmitHandler<TipFormValues> = async (data) => {
    if (!isOnline) {
      setFormError("Cannot submit tips while offline. Please connect to the internet.");
      return;
    }
    setFormError(null);
    setCategorizedResult(null);

    startSubmitting(async () => {
      try {
        const aiInput: CategorizeCommunityTipInput = { tipText: data.tipText, location: data.location };
        const aiResponse = await categorizeCommunityTip(aiInput);
        setCategorizedResult(aiResponse);
        onTipSubmitted({ ...data, ...aiResponse });
        toast({
          title: "Tip Submitted!",
          description: "Your tip has been submitted and categorized.",
        });
        reset();
      } catch (e) {
        setFormError("Failed to categorize and submit tip. Please try again.");
        console.error(e);
        toast({
          title: "Submission Error",
          description: "Could not submit your tip. Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center gap-2">
            <Icons.tip className="h-5 w-5 text-primary" /> Share a Community Tip
        </CardTitle>
        <CardDescription>Help other parents by sharing your experience. Your tip will be reviewed and categorized.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="tipText">Your Tip</Label>
            <Textarea
              id="tipText"
              placeholder="e.g., 'For reducing diaper rash, try applying a thin layer of coconut oil...'"
              {...register("tipText")}
              className={`mt-1 ${errors.tipText ? 'border-destructive' : ''}`}
              disabled={isSubmitting || !isOnline}
            />
            {errors.tipText && <p className="text-xs text-destructive mt-1">{errors.tipText.message}</p>}
          </div>
          <div>
            <Label htmlFor="location">Location (City/Region)</Label>
            <Input
              id="location"
              placeholder="e.g., 'Mumbai'"
              {...register("location")}
              className={`mt-1 ${errors.location ? 'border-destructive' : ''}`}
              disabled={isSubmitting || !isOnline}
            />
            {errors.location && <p className="text-xs text-destructive mt-1">{errors.location.message}</p>}
          </div>

          {!isOnline && (
            <Alert variant="default" className="bg-accent/30 border-accent">
              <Icons.offline className="h-4 w-4" />
              <AlertTitle>Offline Mode</AlertTitle>
              <AlertDescription>You must be online to submit a new tip.</AlertDescription>
            </Alert>
          )}

          {formError && (
            <Alert variant="destructive">
              <Icons.warning className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          {categorizedResult && isOnline && (
            <Alert variant="default" className="bg-green-100 border-green-300">
              <Icons.verified className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-700">Tip Categorized!</AlertTitle>
              <AlertDescription className="text-green-600 text-xs">
                Symptoms: {categorizedResult.symptoms.join(', ') || 'N/A'}<br />
                Age Range: {categorizedResult.ageRange || 'N/A'}<br />
                Categories: {categorizedResult.categories.join(', ') || 'N/A'}
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isSubmitting || !isOnline} className="w-full">
            {isSubmitting ? (
              <>
                <Icons.settings className="mr-2 h-4 w-4 animate-spin" />
                Submitting & Categorizing...
              </>
            ) : (
              <>
                <Icons.send className="mr-2 h-4 w-4" />
                Submit Tip
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
