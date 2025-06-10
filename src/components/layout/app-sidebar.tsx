
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Icons, BachpanAiLogo } from '@/components/icons'; // Changed PulseCareLogo to BachpanAiLogo
import type { NavItem } from '@/lib/types';

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Icons.home },
  { title: 'Smart Vision Monitor', href: '/dashboard/smart-vision', icon: Icons.rashScanner }, // Icon can be updated later
  { title: 'Cry Analyzer', href: '/dashboard/cry-analyzer', icon: Icons.voiceTriage }, // Icon can be updated later
  { title: 'AI Pediatric Advisor', href: '/dashboard/ai-advisor', icon: Icons.messages },
  { title: 'Growth & Vitals', href: '/dashboard/growth-vitals', icon: Icons.realTime }, // Renamed Health Alerts
  { title: 'Community Tips', href: '/dashboard/community-tips', icon: Icons.community },
  { title: 'Emergency Protocol', href: '/dashboard/emergency', icon: Icons.emergency },
];

const secondaryNavItems: NavItem[] = [
  { title: 'Settings', href: '/dashboard/settings', icon: Icons.settings },
  { title: 'Help', href: '/dashboard/help', icon: Icons.help },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="border-b">
        <Link href="/dashboard" className="flex items-center gap-2 p-2">
          <BachpanAiLogo className="h-8 w-8 text-primary group-data-[collapsible=icon]:mx-auto" /> {/* Changed PulseCareLogo */}
          <span className="text-lg font-semibold font-headline text-foreground group-data-[collapsible=icon]:hidden">
            BachpanAI {/* Changed from PulseCare AI */}
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu className="mt-2">
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={item.title}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          {secondaryNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
               <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.title}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
             <SidebarMenuButton className="justify-start">
                <Icons.logout className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
