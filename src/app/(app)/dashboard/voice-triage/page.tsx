import { VoiceTriageCard } from "@/components/dashboard/voice-triage-card";

export default function VoiceTriagePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Voice Triage</h1>
      <div className="max-w-2xl mx-auto">
        <VoiceTriageCard />
      </div>
    </div>
  );
}
