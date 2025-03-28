
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth';
import {
  Activity,
  Calendar,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  HelpCircle,
  AlignJustify,
  ListFilter,
  BarChart4,
  Dumbbell,
  Brain,
  Map,
  AppWindow,
  ChartPieIcon,
  LineChart,
} from 'lucide-react';

type MenuItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  roleAccess: string[];
};

const SidebarMenu: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const userRole = user?.role || 'patient';

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      href: userRole === 'doctor' ? '/dashboard/doctor' : userRole === 'receptionist' ? '/dashboard/receptionist' : '/dashboard/patient',
      icon: <LayoutDashboard className="h-5 w-5" />,
      roleAccess: ['doctor', 'patient', 'receptionist', 'admin'],
    },
    {
      name: 'Patients',
      href: '/patients',
      icon: <Users className="h-5 w-5" />,
      roleAccess: ['doctor', 'receptionist', 'admin'],
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: <FileText className="h-5 w-5" />,
      roleAccess: ['doctor', 'admin'],
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: <Activity className="h-5 w-5" />,
      roleAccess: ['doctor', 'admin'],
    },
    {
      name: 'AI Analysis',
      href: '/ai-analysis',
      icon: <Brain className="h-5 w-5" />,
      roleAccess: ['patient', 'doctor'],
    },
    {
      name: 'Analysis',
      href: '/analysis',
      icon: <LineChart className="h-5 w-5" />,
      roleAccess: ['patient', 'doctor'],
    },
    {
      name: 'Anatomy Map',
      href: '/anatomy-map',
      icon: <Map className="h-5 w-5" />,
      roleAccess: ['patient', 'doctor'],
    },
    {
      name: 'Biomarkers',
      href: '/biomarkers',
      icon: <ChartPieIcon className="h-5 w-5" />,
      roleAccess: ['patient', 'doctor'],
    },
    {
      name: 'Exercises',
      href: '/exercises',
      icon: <Dumbbell className="h-5 w-5" />,
      roleAccess: ['patient'],
    },
    {
      name: 'Health Apps',
      href: '/health-apps',
      icon: <AppWindow className="h-5 w-5" />,
      roleAccess: ['patient'],
    },
    {
      name: 'My Reports',
      href: '/patient-reports',
      icon: <BarChart4 className="h-5 w-5" />,
      roleAccess: ['patient'],
    },
    {
      name: 'Appointments',
      href: '/appointments',
      icon: <Calendar className="h-5 w-5" />,
      roleAccess: ['patient', 'doctor', 'receptionist'],
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roleAccess: ['doctor', 'patient', 'receptionist', 'admin'],
    },
    {
      name: 'Help & Support',
      href: '/help',
      icon: <HelpCircle className="h-5 w-5" />,
      roleAccess: ['doctor', 'patient', 'receptionist', 'admin'],
    },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roleAccess.includes(userRole));

  return (
    <nav className="space-y-1 px-2 py-4">
      {filteredMenuItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-colors",
              isActive
                ? "bg-primary/10 text-primary dark:bg-primary/20"
                : "hover:bg-muted text-foreground/80 hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="mr-3 text-foreground/50">{item.icon}</span>
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;
