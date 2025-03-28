
import React from 'react';
import { Bell, Search, Settings, Menu, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MobileToggle } from './sidebar/MobileToggle';
import { useSidebarResponsive } from './sidebar/useSidebarResponsive';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  className
}) => {
  const { user, logout } = useAuth();
  const { isOpen, toggleSidebar, isMobile } = useSidebarResponsive();

  const handleLogout = async () => {
    // Disable the logout button during logout process
    const button = document.querySelector('[data-logout-button]') as HTMLButtonElement;
    if (button) button.disabled = true;
    
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
      // Re-enable button if there's an error
      if (button) button.disabled = false;
    }
  };

  return (
    <header className={cn(
      "w-full h-16 flex items-center justify-between px-4 md:px-6 border-b sticky top-0 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm",
      className
    )}>
      <div className="flex items-center gap-2">
        <MobileToggle isOpen={isOpen} toggleSidebar={toggleSidebar} className="mr-2" />
        
        <h1 className="text-lg md:text-xl font-bold text-gradient">OPTM Health †</h1>
        
        <div className="hidden md:flex items-center bg-white/50 dark:bg-black/20 rounded-lg px-3 py-1.5 ml-6 min-w-56 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search patients, treatments, etc." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors md:hidden"
        >
          <Search className="w-4 h-4 text-foreground" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8 md:w-9 md:h-9 hidden md:flex items-center justify-center rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
        >
          <Settings className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
              <span className="text-xs md:text-sm font-medium text-primary">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'PT'}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 z-50 bg-card border border-border shadow-md">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">
              <span>Signed in as</span>
              <span className="ml-2 font-medium truncate max-w-[180px]">{user?.email || 'patient@example.com'}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} data-logout-button className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
