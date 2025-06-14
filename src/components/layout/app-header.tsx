
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons, BachpanAiLogo } from '@/components/icons'; // Changed PulseCareLogo to BachpanAiLogo
import { useConnectivity } from '@/contexts/connectivity-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const { isOnline, setIsOnline } = useConnectivity();
  const { toggleSidebar, open: isSidebarOpen, isMobile, openMobile: isMobileSidebarOpen } = useSidebar();

  let ToggleIcon = Icons.menu;
  let toggleAriaLabel = "Open menu";

  if (isMobile) {
    ToggleIcon = Icons.menu;
    toggleAriaLabel = isMobileSidebarOpen ? "Close menu" : "Open menu";
  } else {
    if (isSidebarOpen) {
      ToggleIcon = Icons.panelLeftOpen;
      toggleAriaLabel = "Collapse sidebar";
    } else {
      ToggleIcon = Icons.panelLeftClose;
      toggleAriaLabel = "Expand sidebar";
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label={toggleAriaLabel}
      >
        <ToggleIcon className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2">
        <BachpanAiLogo className="h-8 w-8 text-primary" /> {/* Changed PulseCareLogo to BachpanAiLogo */}
        <Link href="/dashboard" className="text-xl font-bold font-headline text-foreground">
          BachpanAI {/* Changed from PulseCare AI */}
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center space-x-2">
          {isOnline ? <Icons.online className="h-5 w-5 text-green-500" /> : <Icons.offline className="h-5 w-5 text-red-500" />}
          <Label htmlFor="connectivity-switch" className="text-sm">
            {isOnline ? 'Online' : 'Offline'}
          </Label>
          <Switch
            id="connectivity-switch"
            checked={isOnline}
            onCheckedChange={setIsOnline}
            aria-label="Toggle connectivity"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                <AvatarFallback>BA</AvatarFallback> {/* Changed from PA */}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icons.profile className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icons.logout className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
