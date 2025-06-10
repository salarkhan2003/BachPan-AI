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

// BachpanAI Logo SVG (Simple Placeholder)
export const BachpanAiLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="3" ry="3" stroke="currentColor" fill="hsl(var(--primary))" strokeWidth="1.5"></rect>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--primary-foreground))" fontFamily="Space Grotesk, sans-serif">
      B
    </text>
    <text x="65%" y="70%" dominantBaseline="middle" textAnchor="middle" fontSize="5" fontWeight="normal" fill="hsl(var(--primary-foreground))" fontFamily="Inter, sans-serif">
      ai
    </text>
  </svg>
);
