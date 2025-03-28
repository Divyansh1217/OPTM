
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { cn } from '@/lib/utils';
import { MenuItem } from './types';

interface SidebarContentProps {
  menuItems: MenuItem[];
  bottomMenuItems: MenuItem[];
  onNavigate: (path: string) => void;
  isCollapsed?: boolean;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  menuItems,
  bottomMenuItems,
  onNavigate,
  isCollapsed = false
}) => {
  const location = useLocation();
  const [expandedGroup, setExpandedGroup] = React.useState<string | null>(null);

  // Check if the current route matches a menu item or its children
  const isActiveRoute = (item: MenuItem): boolean => {
    if (location.pathname === item.path) return true;
    
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    
    return false;
  };

  // Toggle a submenu's expanded state
  const toggleSubMenu = (label: string) => {
    setExpandedGroup(expandedGroup === label ? null : label);
  };

  return (
    <>
      {/* App logo or title */}
      <div className={cn(
        "px-4 mb-6 flex items-center h-10",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
        {!isCollapsed ? (
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            OPTM
          </h1>
        ) : (
          <span className="text-xl font-bold text-primary">O</span>
        )}
      </div>

      {/* Main menu items */}
      <div className="flex-1 space-y-1 px-3 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => (
          <React.Fragment key={item.label}>
            {item.children && item.children.length > 0 ? (
              <div className="space-y-1">
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className={cn(
                    "w-full flex items-center rounded-md px-3 py-2 text-sm mb-1 transition-colors",
                    isActiveRoute(item) ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  {item.icon && (
                    <item.icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")} />
                  )}
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight 
                        className={cn(
                          "h-4 w-4 transition-transform", 
                          expandedGroup === item.label && "rotate-90"
                        )} 
                      />
                    </>
                  )}
                </button>
                
                {!isCollapsed && expandedGroup === item.label && item.children && (
                  <div className="pl-8 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <SidebarMenuItem
                        key={child.label}
                        item={child}
                        isActive={location.pathname === child.path}
                        onNavigate={onNavigate}
                        isCollapsed={isCollapsed}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <SidebarMenuItem
                item={item}
                isActive={isActiveRoute(item)}
                onNavigate={onNavigate}
                isCollapsed={isCollapsed}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom menu items */}
      <div className="mt-auto border-t border-border/50 pt-2 px-3 pb-2 space-y-1">
        {bottomMenuItems.map((item) => (
          <SidebarMenuItem
            key={item.label}
            item={item}
            isActive={isActiveRoute(item)}
            onNavigate={onNavigate}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </>
  );
};
