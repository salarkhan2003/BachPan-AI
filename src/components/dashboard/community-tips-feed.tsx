"use client";

import { useState, useEffect } from 'react';
import { CommunityTipCard } from "./community-tip-card";
import { SubmitTipForm } from "./submit-tip-form";
import { mockCommunityTips } from "@/lib/mock-data";
import type { CommunityTip } from "@/lib/types";
import { Icons } from "@/components/icons";
import { useConnectivity } from '@/contexts/connectivity-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CommunityTipsFeed() {
  const [tips, setTips] = useState<CommunityTip[]>(mockCommunityTips);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOnline } = useConnectivity();

  // Simulate fetching new tips when online status changes or on mount
  useEffect(() => {
    if (isOnline) {
      // In a real app, fetch tips from a backend
      // For demo, just re-set or slightly alter mock data
      setTips([...mockCommunityTips].sort(() => 0.5 - Math.random())); // Shuffle
    } else {
      // Show cached/limited tips when offline
      setTips(mockCommunityTips.filter(tip => tip.isVerified).slice(0, 3));
    }
  }, [isOnline]);

  const handleNewTip = (newTipData: any) => {
    const newTip: CommunityTip = {
      id: `tip-${Date.now()}`,
      author: "You (New Tip)", // Placeholder author
      tipText: newTipData.tipText,
      location: newTipData.location,
      timestamp: new Date().toISOString(),
      symptoms: newTipData.symptoms,
      ageRange: newTipData.ageRange,
      categories: newTipData.categories,
      isVerified: false, // New tips are not verified by default
    };
    setTips(prevTips => [newTip, ...prevTips]);
  };

  const filteredTips = tips.filter(tip =>
    tip.tipText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section aria-labelledby="community-tips-heading" className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
            <Icons.communityHeart className="h-7 w-7 text-primary" />
            <h2 id="community-tips-heading" className="text-2xl font-semibold font-headline text-foreground">
            Community Micro-Tip Feed
            </h2>
        </div>
        <div className="w-full sm:w-auto flex gap-2">
          <Input
            type="search"
            placeholder="Search tips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-xs"
          />
        </div>
      </div>

      {!isOnline && (
        <div className="p-3 rounded-md bg-accent/20 border border-accent text-accent-foreground text-sm flex items-center gap-2">
          <Icons.offline className="h-4 w-4" />
          <span>You are offline. Showing cached tips. Some features may be limited.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {filteredTips.length > 0 ? (
            <ScrollArea className="h-[600px] pr-4 -mr-4"> {/* Negative margin to hide scrollbar track if it overflows */}
              <div className="space-y-4">
                {filteredTips.map((tip) => (
                  <CommunityTipCard key={tip.id} tip={tip} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-center bg-muted/30 rounded-md p-6">
              <Icons.info className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-lg font-medium text-foreground">No Tips Found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms." : "There are no tips to display currently."}
              </p>
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <SubmitTipForm onTipSubmitted={handleNewTip} />
        </div>
      </div>
    </section>
  );
}
