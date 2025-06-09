import type { CommunityTip } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';

interface CommunityTipCardProps {
  tip: CommunityTip;
}

export function CommunityTipCard({ tip }: CommunityTipCardProps) {
  const timeAgo = formatDistanceToNow(new Date(tip.timestamp), { addSuffix: true });

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 bg-background/70">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src={tip.avatarUrl || `https://placehold.co/40x40.png?text=${tip.author.charAt(0)}`} alt={tip.author} data-ai-hint="person avatar" />
              <AvatarFallback>{tip.author.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium leading-none">{tip.author}</CardTitle>
              <p className="text-xs text-muted-foreground">{tip.location} &bull; {timeAgo}</p>
            </div>
          </div>
          {tip.isVerified && (
            <Badge variant="default" className="text-xs bg-green-500 hover:bg-green-600 text-white">
              <Icons.verified className="mr-1 h-3 w-3" /> Verified
            </Badge>
          )}
           {!tip.isVerified && (
            <Badge variant="secondary" className="text-xs">
              <Icons.unverified className="mr-1 h-3 w-3" /> Awaiting Verification
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-foreground/90">{tip.tipText}</p>
        {(tip.symptoms || tip.ageRange || tip.categories) && (
          <div className="mt-3 space-x-1 space-y-1">
            {tip.symptoms?.map(symptom => <Badge key={symptom} variant="outline" className="text-xs">{symptom}</Badge>)}
            {tip.ageRange && <Badge variant="outline" className="text-xs">Age: {tip.ageRange}</Badge>}
            {tip.categories?.map(category => <Badge key={category} variant="outline" className="text-xs">{category}</Badge>)}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-3 flex justify-end">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Icons.share className="mr-1 h-3.5 w-3.5" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
