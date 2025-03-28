
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MenuItem } from './types';

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onNavigate: (path: string) => void;
  isCollapsed?: boolean;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isActive,
  onNavigate,
  isCollapsed = false
}) => {
  const MenuButton = (
    <button
      onClick={() => item.path && onNavigate(item.path)}
      disabled={!item.path}
      className={cn(
        "w-full flex items-center rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        isCollapsed && "justify-center px-2"
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.icon && (
        <item.icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "mx-auto" : "mr-2")} />
      )}
      {!isCollapsed && (
        <span className="truncate">{item.label}</span>
      )}
      {!isCollapsed && item.badge && (
        <span className={cn(
          "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
          item.badgeColor === 'red' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
          item.badgeColor === 'green' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
          item.badgeColor === 'blue' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
          "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
        )}>
          {item.badge}
        </span>
      )}
    </button>
  );

  // If sidebar is collapsed, show tooltip
  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            {MenuButton}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-normal">
            {item.label}
            {item.badge && (
              <span className={cn(
                "ml-1 rounded-full px-1.5 py-0.5 text-xs font-medium",
                item.badgeColor === 'red' ? "bg-red-100 text-red-600" :
                item.badgeColor === 'green' ? "bg-green-100 text-green-600" :
                item.badgeColor === 'blue' ? "bg-blue-100 text-blue-600" :
                "bg-gray-100 text-gray-600"
              )}>
                {item.badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return MenuButton;
};
