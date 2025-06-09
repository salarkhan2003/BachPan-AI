
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context"; // Import useTheme

export default function SettingsPage() {
  const { theme, setTheme, effectiveTheme } = useTheme(); // Use the theme context

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
                <Switch id="push-notifications" disabled />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="email-updates" className="cursor-pointer">Email Updates for New Features</Label>
                <Switch id="email-updates" disabled />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="community-alerts" className="cursor-pointer">Community Tip Alerts</Label>
                <Switch id="community-alerts" disabled />
              </div>
            </div>
             <p className="text-xs text-muted-foreground mt-1">
              Notification settings are currently placeholders and will be functional in a future update.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Account Details</h3>
            <div className="p-3 border rounded-md">
              <p className="text-muted-foreground mb-2">Manage your profile information and account settings.</p>
              <Button variant="outline" disabled>
                <Icons.profile className="mr-2 h-4 w-4" /> View Profile (Coming Soon)
              </Button>
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
