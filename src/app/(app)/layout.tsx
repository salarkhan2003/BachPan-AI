
"use client";

import React, { useEffect } from 'react'; // Added useEffect
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { useToast } from '@/hooks/use-toast'; // Added useToast
import { Icons } from '@/components/icons'; // Added Icons for toast

const mockNotifications = [
  { title: "New Community Tip!", description: "Aisha S. shared: 'Try gripe water for fussy evenings.'", icon: Icons.tip },
  { title: "Milestone Alert", description: "Your baby might be ready to try sitting with support!", icon: Icons.milestone },
  { title: "Health Reminder", description: "Don't forget the upcoming 6-month vaccination check.", icon: Icons.immunization },
  { title: "User Liked Your Tip", description: "Rohan K. liked your tip about teething remedies.", icon: Icons.communityHeart },
  { title: "New Feature", description: "Check out the improved Cry Analyzer!", icon: Icons.info }
];

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showRandomNotification = () => {
      if (document.visibilityState === 'visible') { // Only show if tab is active
        const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
        toast({
          title: (
            <div className="flex items-center gap-2">
              {React.createElement(randomNotification.icon, { className: "h-5 w-5 text-primary" })}
              <span>{randomNotification.title}</span>
            </div>
          ),
          description: randomNotification.description,
          duration: 5000, // Show for 5 seconds
        });
      }
      
      // Schedule next notification
      const randomDelay = Math.random() * (30000 - 10000) + 10000; // Between 10 and 30 seconds
      timeoutId = setTimeout(showRandomNotification, randomDelay);
    };

    // Start the first notification after a short delay
    timeoutId = setTimeout(showRandomNotification, 5000); // Initial delay

    return () => {
      clearTimeout(timeoutId); // Cleanup on unmount
    };
  }, [toast]);


  return (
    <>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          {children}
        </main>
      </div>
    </>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppLayoutContent>{children}</AppLayoutContent>
      </div>
    </SidebarProvider>
  );
}
