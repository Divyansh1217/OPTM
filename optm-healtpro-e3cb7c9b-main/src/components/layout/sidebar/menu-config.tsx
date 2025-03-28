
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart2, 
  Settings, 
  HelpCircle,
  TestTube,
  Smartphone,
  Dumbbell,
  Calendar,
  Brain,
  Activity,
  DollarSign,
  PackageCheck,
  PhoneCall,
  ClipboardList,
  LineChart
} from 'lucide-react';
import { MenuItem } from './types';

// Common dashboard menu item
export const getDashboardItem = (role: 'doctor' | 'patient' | 'receptionist'): MenuItem => ({ 
  icon: LayoutDashboard, 
  label: 'Dashboard', 
  path: `/dashboard/${role}`,
  description: 'Overview of dashboard and key metrics'
});

// Doctor specific menu items
export const getDoctorMenuItems = (): MenuItem[] => [
  getDashboardItem('doctor'),
  { 
    icon: Users, 
    label: 'Patients', 
    path: '/patients',
    description: 'Manage patient records and information'
  },
  { 
    icon: FileText, 
    label: 'Reports', 
    path: '/reports',
    description: 'Access and create clinical reports and documentation'
  },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    path: '/analytics',
    description: 'Visualize clinical data and treatment outcomes'
  },
  { 
    icon: Calendar, 
    label: 'Appointments', 
    path: '/appointments',
    description: 'View and manage your appointment schedule'
  },
];

// Patient specific menu items
export const getPatientMenuItems = (): MenuItem[] => [
  getDashboardItem('patient'),
  { 
    icon: Brain, 
    label: 'AI Report Analysis', 
    path: '/ai-analysis',
    description: 'Get AI-powered analysis of your medical reports',
    badge: 'New',
    badgeColor: 'blue'
  },
  { 
    icon: LineChart, 
    label: 'Analysis', 
    path: '/analysis',
    description: 'View detailed analysis of your treatment progress',
  },
  { 
    icon: Activity, 
    label: 'Anatomy Map', 
    path: '/anatomy-map',
    description: 'Track pain symptoms on an interactive anatomy map'
  },
  { 
    icon: TestTube, 
    label: 'Biomarkers', 
    path: '/biomarkers',
    description: 'View and upload your biomarker data and test results'
  },
  { 
    icon: FileText, 
    label: 'My Reports', 
    path: '/patient-reports',
    description: 'View your medical reports and documents'
  },
  { 
    icon: Calendar, 
    label: 'Appointments', 
    path: '/appointments',
    description: 'View and manage your appointments',
    badge: '2',
    badgeColor: 'red'
  },
  { 
    icon: Smartphone, 
    label: 'Health Apps', 
    path: '/health-apps',
    description: 'Connect and manage your health and fitness applications'
  },
  { 
    icon: Dumbbell, 
    label: 'Exercises', 
    path: '/exercises',
    description: 'View and perform recommended exercises with AI guidance',
    badge: '3',
    badgeColor: 'green'
  },
];

// Receptionist specific menu items
export const getReceptionistMenuItems = (): MenuItem[] => [
  getDashboardItem('receptionist'),
  { 
    icon: Users, 
    label: 'Patients', 
    path: '/patients',
    description: 'Manage patient profiles and contact information'
  },
  { 
    icon: Calendar, 
    label: 'Appointments', 
    path: '/appointments',
    description: 'Schedule and manage patient appointments',
    badge: '5',
    badgeColor: 'blue'
  },
  { 
    icon: DollarSign, 
    label: 'Billing', 
    path: '/billing',
    description: 'Manage invoices and payments'
  },
  { 
    icon: PackageCheck, 
    label: 'Inventory', 
    path: '/inventory',
    description: 'Track and manage clinic supplies and medications'
  },
  { 
    icon: PhoneCall, 
    label: 'Communications', 
    path: '/communications',
    description: 'Manage patient communications and reminders'
  },
  { 
    icon: ClipboardList, 
    label: 'Forms', 
    path: '/forms',
    description: 'Manage patient intake and consent forms'
  },
];

// Bottom menu items used for all roles
export const getBottomMenuItems = (): MenuItem[] => [
  { 
    icon: Settings, 
    label: 'Settings', 
    path: '/settings',
    description: 'Configure application preferences'
  },
  { 
    icon: HelpCircle, 
    label: 'Help', 
    path: '/help',
    description: 'Get assistance and support'
  },
];
