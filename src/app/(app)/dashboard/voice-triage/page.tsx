
import { VoiceTriageCard } from "@/components/dashboard/voice-triage-card"; // This will be replaced by CryAnalyzerCard

export default function CryAnalyzerPage() { // Renamed function
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Cry Analyzer</h1> {/* Renamed title */}
      <div className="max-w-2xl mx-auto">
        {/* Placeholder: CryAnalyzerCard will go here. Using VoiceTriageCard for now. */}
        <VoiceTriageCard />
         <p className="text-center mt-4 text-muted-foreground">
          (This page will feature the Cry Analyzer to understand baby's cries from text input.)
        </p>
      </div>
    </div>
  );
}
