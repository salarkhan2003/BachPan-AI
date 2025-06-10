
import {
  Home,
  Mic,
  ScanSearch,
  ShieldAlert,
  Activity,
  Users,
  Bell,
  MessageSquare,
  Cloud,
  CloudOff,
  Syringe,
  MapPin,
  Wind,
  Baby,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  UserCircle,
  LogOut,
  Share2,
  HeartHandshake,
  BookOpen,
  Info,
  PhoneCall,
  Image as ImageIcon,
  Send,
  CalendarDays,
  ListChecks,
  Lightbulb,
  Smile,
  CircleHelp,
  ChevronRight,
  Menu,
  PanelLeftOpen,
  PanelLeftClose,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const Icons = {
  home: Home,
  voiceTriage: Mic, // Will be reused for Cry Analyzer
  rashScanner: ScanSearch, // Will be reused for Smart Vision
  emergency: ShieldAlert,
  realTime: Activity, // Reused for Growth & Vitals
  community: Users,
  alerts: Bell, // Can be repurposed or kept if general alerts are needed
  messages: MessageSquare, // For AI Pediatric Advisor
  online: Cloud,
  offline: CloudOff,
  vaccine: Syringe,
  clinic: MapPin,
  aqi: Wind,
  baby: Baby,
  verified: CheckCircle,
  unverified: XCircle,
  warning: AlertTriangle,
  settings: Settings,
  profile: UserCircle,
  logout: LogOut,
  share: Share2,
  tip: Lightbulb,
  milestone: Smile,
  immunization: CalendarDays,
  firstAid: BookOpen,
  info: Info,
  phone: PhoneCall,
  image: ImageIcon,
  send: Send,
  listChecks: ListChecks,
  communityHeart: HeartHandshake,
  help: CircleHelp,
  chevronRight: ChevronRight,
  menu: Menu,
  panelLeftOpen: PanelLeftOpen,
  panelLeftClose: PanelLeftClose,
};

export type IconName = keyof typeof Icons;
export const getIcon = (name: IconName): LucideIcon => Icons[name] || Info;

// BachpanAI Logo SVG (Updated with Heart Symbol)
export const BachpanAiLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.5" // Default stroke width for elements unless overridden
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props} // Spread props allows className, style, etc. to be passed
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      ry="3"
      fill="hsl(var(--primary))"   // Fill color of the rectangle
      stroke="hsl(var(--primary-foreground))" // Border color for the rectangle
      strokeWidth="1" // Explicit stroke width for the rectangle border
    />

    {/* Centered Heart Symbol representing Care */}
    <path
      // A standard, compact heart path scaled and positioned for this logo
      d="M12 4.434C10.277 2.985 7.755 2.985 6.032 4.434C4.309 5.883 4.309 8.212 6.032 9.661L12 14.558L17.968 9.661C19.691 8.212 19.691 5.883 17.968 4.434C16.245 2.985 13.723 2.985 12 4.434Z"
      fill="hsl(var(--primary-foreground))" // Heart color
      stroke="hsl(var(--primary-foreground))" // Heart border, same as fill for solid appearance
      strokeWidth="0.5" // Thin stroke for the heart itself
    />

    {/* "ai" text, positioned bottom-right within the colored box */}
    <text
      x="18.5" // Positioned towards the right edge of the inner box area
      y="18.5" // Positioned towards the bottom edge of the inner box area
      dominantBaseline="alphabetic" // Aligns bottom of text more predictably
      textAnchor="end" // Anchors text from its right end
      fontSize="6"
      fontWeight="bold"
      fill="hsl(var(--primary-foreground))"
      fontFamily="Inter, sans-serif"
    >
      ai
    </text>
  </svg>
);
