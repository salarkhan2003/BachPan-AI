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
  CircleHelp
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const Icons = {
  home: Home,
  voiceTriage: Mic,
  rashScanner: ScanSearch,
  emergency: ShieldAlert,
  realTime: Activity,
  community: Users,
  alerts: Bell,
  messages: MessageSquare,
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
};

export type IconName = keyof typeof Icons;
export const getIcon = (name: IconName): LucideIcon => Icons[name] || Info;

// PulseCare AI Logo SVG (Simple Placeholder)
export const PulseCareLogo = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1" />
    <path d="m16.5 3-1.5 4-2-4-2 4-1.5-4" />
  </svg>
);
