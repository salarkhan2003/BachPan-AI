
// Placeholder for AI Pediatric Advisor Page
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
// We will create an AiAdvisorCard component later

export default function AiAdvisorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Icons.messages className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold font-headline">AI Pediatric Advisor</h1>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ask BachpanAI</CardTitle>
          <CardDescription>
            Get guidance on baby care, feeding, sleep, common ailments, and more.
            This AI advisor is for informational purposes only and not a substitute for professional medical advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for the chat interface - AiAdvisorCard will go here */}
          <p className="text-muted-foreground">
            The chat interface for the AI Pediatric Advisor will be implemented here.
            You'll be able to type your questions and receive AI-generated advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
