"use client";

import { useState, useTransition, useRef } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { rashAnalysis, RashAnalysisInput } from '@/ai/flows/rash-analysis';
import type { RashAnalysisOutput } from '@/ai/flows/rash-analysis';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';

export function RashScannerCard() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [result, setResult] = useState<RashAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(URL.createObjectURL(file)); // For display
        setImageDataUri(dataUri); // For AI flow
        setError(null);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageDataUri) {
      setError("Please upload an image of the rash.");
      return;
    }
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const input: RashAnalysisInput = { photoDataUri: imageDataUri };
        const response = await rashAnalysis(input);
        setResult(response);
      } catch (e) {
        setError("Failed to analyze rash. Please try again.");
        console.error(e);
      }
    });
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icons.rashScanner className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Rash Scanner</CardTitle>
        </div>
        <CardDescription>Upload an image of the rash for AI-powered analysis and recommendations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="rash-image-upload" className="text-sm font-medium">Upload Rash Image</Label>
          <Input
            id="rash-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
            ref={fileInputRef}
            disabled={isPending}
          />
          {imagePreview && (
            <div className="mt-4 relative w-full h-48 rounded-md overflow-hidden border border-dashed">
              <Image src={imagePreview} alt="Rash preview" layout="fill" objectFit="contain" data-ai-hint="skin rash" />
            </div>
          )}
          {!imagePreview && (
             <div className="mt-4 flex items-center justify-center w-full h-48 rounded-md border border-dashed border-muted-foreground/50 bg-muted/20">
                <div className="text-center text-muted-foreground">
                    <Icons.image className="mx-auto h-12 w-12" />
                    <p className="mt-2 text-sm">Image preview will appear here</p>
                </div>
            </div>
          )}
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
            <h4 className="font-semibold text-foreground">Rash Analysis:</h4>
            <div>
              <p className="font-medium text-sm">Possible Conditions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                {result.possibleConditions.map((condition, index) => <li key={index}>{condition}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm">Recommended Next Steps:</p>
              <p className="text-sm text-muted-foreground ml-4">{result.recommendedNextSteps}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isPending || !imageDataUri} className="w-full">
          {isPending ? (
            <>
              <Icons.settings className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Icons.send className="mr-2 h-4 w-4" />
              Analyze Rash
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
