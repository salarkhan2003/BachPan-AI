
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Icons } from "@/components/icons";

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Help & Support</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.help className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find answers to common questions about BachpanAI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the Cry Analyzer work?</AccordionTrigger>
              <AccordionContent>
                The Cry Analyzer (simulated via text input for this prototype) allows you to describe your baby's cry. Our AI analyzes this information and suggests potential meanings and actions. This feature is for informational purposes and not a substitute for professional medical advice.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is the Smart Vision Monitor accurate?</AccordionTrigger>
              <AccordionContent>
                The Smart Vision Monitor (using image uploads in this prototype) uses AI to identify baby's posture and potential safety concerns from an image. While it can provide helpful insights, it's essential to always ensure a safe environment and consult a pediatrician for any health concerns.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
              <AccordionTrigger>How does the AI Pediatric Advisor work?</AccordionTrigger>
              <AccordionContent>
                The AI Pediatric Advisor is an LLM-powered chatbot where you can ask questions about baby care, feeding, sleep, and common ailments. It provides general guidance and information. Always consult a doctor for medical diagnosis and treatment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I submit a Community Tip?</AccordionTrigger>
              <AccordionContent>
                Navigate to the Community Tips section and use the "Share a Community Tip" form. Your tip will be reviewed and categorized to help other parents.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-5">
              <AccordionTrigger>What if I'm offline?</AccordionTrigger>
              <AccordionContent>
                BachpanAI offers hybrid functionality. Some features like AI analysis require an internet connection. However, you can still access cached information like verified community tips, emergency protocols, and basic health data.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
       <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.phone className="h-6 w-6 text-primary" />
            Contact Support
          </CardTitle>
          <CardDescription>If you need further assistance, please reach out.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>For support, please email us at: <a href="mailto:psalarkhan22@gmail.com" className="text-primary hover:underline">psalarkhan22@gmail.com</a></p>
          <p className="mt-2">Our team will get back to you as soon as possible.</p>
        </CardContent>
      </Card>
    </div>
  );
}
