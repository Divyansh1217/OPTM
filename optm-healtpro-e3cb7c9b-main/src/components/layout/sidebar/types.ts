
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
  badge?: string;
  badgeColor?: 'red' | 'green' | 'blue' | string;
  children?: MenuItem[];
}

export interface SidebarProps {
  className?: string;
}
