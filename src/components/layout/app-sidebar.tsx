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
import { Icons, PulseCareLogo } from '@/components/icons';
import type { NavItem } from '@/lib/types';

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Icons.home },
  { title: 'Voice Triage', href: '/dashboard/voice-triage', icon: Icons.voiceTriage },
  { title: 'Rash Scanner', href: '/dashboard/rash-scanner', icon: Icons.rashScanner },
  { title: 'Emergency', href: '/dashboard/emergency', icon: Icons.emergency },
  { title: 'Community Tips', href: '/dashboard/community-tips', icon: Icons.community },
  { title: 'Health Alerts', href: '/dashboard/health-alerts', icon: Icons.alerts },
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
          <PulseCareLogo className="h-8 w-8 text-primary group-data-[collapsible=icon]:mx-auto" />
          <span className="text-lg font-semibold font-headline text-foreground group-data-[collapsible=icon]:hidden">
            PulseCare AI
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu className="mt-2">
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
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
               <Link href={item.href} legacyBehavior passHref>
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
