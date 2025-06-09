import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.settings className="h-6 w-6 text-primary" />
            Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings page is under construction. Come back later for more options!</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 cursor-pointer">
              <p>Notification Preferences</p>
              <Icons.chevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 cursor-pointer">
              <p>Account Details</p>
              <Icons.chevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 cursor-pointer">
              <p>Theme (Light/Dark)</p>
              <Icons.chevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
