
"use client";

import { useState, useTransition, useRef, useEffect } from 'react';
import { pediatricAdvisor, PediatricAdvisorInput, PediatricAdvisorOutput } from '@/ai/flows/pediatricAdvisorFlow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export function AiAdvisorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim()) {
      toast({
        title: "Empty Question",
        description: "Please type your question before sending.",
        variant: "destructive",
      });
      return;
    }
    setError(null);

    const userMessage: Message = { id: `user-${Date.now()}`, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    startTransition(async () => {
      try {
        const aiInput: PediatricAdvisorInput = { question: currentInput };
        const response: PediatricAdvisorOutput = await pediatricAdvisor(aiInput);
        const aiMessage: Message = { id: `ai-${Date.now()}`, text: response.answer, sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      } catch (err) {
        setError("Sorry, I couldn't process your question right now. Please try again later.");
        console.error(err);
        // Add the user message back if AI fails
        setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
        setInput(currentInput); // Restore input
         toast({
          title: "Error",
          description: "Failed to get a response from the AI advisor.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
      <ScrollArea className="flex-1 p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <Avatar className="h-8 w-8 bg-primary text-primary-foreground self-start">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted text-muted-foreground rounded-bl-none'
              }`}
            >
              <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
            </div>
            {message.sender === 'user' && (
              <Avatar className="h-8 w-8 bg-secondary text-secondary-foreground self-start">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isPending && messages[messages.length -1]?.sender === 'user' && (
            <div className="flex items-end gap-2 justify-start">
                 <Avatar className="h-8 w-8 bg-primary text-primary-foreground self-start">
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-lg px-4 py-2 text-sm bg-muted text-muted-foreground rounded-bl-none">
                    <Icons.settings className="h-4 w-4 animate-spin inline-block mr-2" />
                    Thinking...
                </div>
            </div>
        )}
      </ScrollArea>

      {error && (
        <div className="p-4">
          <Alert variant="destructive">
            <Icons.warning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="border-t p-4 flex items-start gap-2 bg-background">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question about baby care here..."
          className="flex-1 resize-none min-h-[40px]"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending || !input.trim()} size="icon">
          {isPending ? <Icons.settings className="h-4 w-4 animate-spin" /> : <Icons.send className="h-4 w-4" />}
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
