
"use client";

import { useState } from "react"; // Import useState
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { useToast } from '@/hooks/use-toast'; // Import useToast

export default function SettingsPage() {
  const { theme, setTheme, effectiveTheme } = useTheme();
  const { toast } = useToast(); // Initialize toast

  // Local state for switches
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [communityAlerts, setCommunityAlerts] = useState(true); // Default one to true for variety

  const handleViewProfile = () => {
    toast({
      title: "Coming Soon!",
      description: "Managing your profile will be available in a future update.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Settings</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.settings className="h-6 w-6 text-primary" />
            Application Settings
          </CardTitle>
          <CardDescription>Manage your application preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div>
            <h3 className="text-lg font-medium mb-2">Theme</h3>
            <RadioGroup value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system">System (Current: {effectiveTheme})</Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground mt-1">
              Select your preferred application theme. 'System' will match your operating system's preference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="push-notifications" className="cursor-pointer">Push Notifications</Label>
                <Switch 
                  id="push-notifications" 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="email-updates" className="cursor-pointer">Email Updates for New Features</Label>
                <Switch 
                  id="email-updates"
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="community-alerts" className="cursor-pointer">Community Tip Alerts</Label>
                <Switch 
                  id="community-alerts"
                  checked={communityAlerts}
                  onCheckedChange={setCommunityAlerts}
                />
              </div>
            </div>
             <p className="text-xs text-muted-foreground mt-1">
              Notification settings are for demonstration and are not currently saved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Account Details</h3>
            <div className="p-3 border rounded-md">
              <p className="text-muted-foreground mb-2">Manage your profile information and account settings.</p>
              <Button variant="outline" onClick={handleViewProfile}>
                <Icons.profile className="mr-2 h-4 w-4" /> View Profile
              </Button>
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
