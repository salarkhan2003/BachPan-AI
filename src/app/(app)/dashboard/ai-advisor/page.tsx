
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { AiAdvisorChat } from "@/components/dashboard/ai-advisor-chat";

export default function AiAdvisorPage() {
  return (
    <div className="container mx-auto py-8 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Icons.messages className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold font-headline">AI Pediatric Advisor</h1>
      </div>
      <Card className="flex-1 flex flex-col max-w-3xl mx-auto w-full shadow-xl">
        <CardHeader>
          <CardTitle>Ask BachpanAI</CardTitle>
          <CardDescription>
            Get guidance on baby care, feeding, sleep, common ailments, and more.
            This AI advisor is for informational purposes only and not a substitute for professional medical advice.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <AiAdvisorChat />
        </CardContent>
      </Card>
    </div>
  );
}
