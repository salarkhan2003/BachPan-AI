
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ConnectivityProvider } from '@/contexts/connectivity-context';
import { ThemeProvider } from '@/contexts/theme-context'; // Added ThemeProvider

export const metadata: Metadata = {
  title: 'PulseCare AI',
  description: 'Intelligent hybrid-mode baby care companion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>{/* Added suppressHydrationWarning for theme changes */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider> {/* Wrapped with ThemeProvider */}
          <ConnectivityProvider>
            {children}
            <Toaster />
          </ConnectivityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
