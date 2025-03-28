
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarContent } from './sidebar/SidebarContent';
import { getDoctorMenuItems, getPatientMenuItems, getReceptionistMenuItems, getBottomMenuItems } from './sidebar/menu-config';
import { useSidebarResponsive } from './sidebar/useSidebarResponsive';
import { MobileToggle } from './sidebar/MobileToggle';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { isOpen, toggleSidebar, isMobile, setIsOpen } = useSidebarResponsive();

  // Get the correct menu items based on user role
  const getMenuItems = () => {
    if (user?.role === 'doctor') {
      return getDoctorMenuItems();
    } else if (user?.role === 'receptionist') {
      return getReceptionistMenuItems();
    } else {
      return getPatientMenuItems();
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, setIsOpen]);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const mobileToggle = document.querySelector('[aria-label="Open sidebar"], [aria-label="Close sidebar"]');
      
      if (
        sidebar && 
        !sidebar.contains(event.target as Node) && 
        mobileToggle &&
        !mobileToggle.contains(event.target as Node) &&
        isMobile && 
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen, setIsOpen]);

  return (
    <>
      <aside
        id="sidebar"
        className={`
          bg-card border-r border-border
          flex flex-col h-screen transition-all duration-300 ease-in-out overflow-hidden
          fixed lg:relative z-50
          ${isOpen ? 'w-64' : 'w-0 lg:w-16'}
          ${isMobile ? (isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0') : 'translate-x-0'}
        `}
      >
        <div className="flex-1 flex flex-col h-full pt-6 pb-4">
          <SidebarContent
            menuItems={getMenuItems()}
            bottomMenuItems={getBottomMenuItems()}
            onNavigate={handleNavigate}
            isCollapsed={!isOpen}
          />
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="absolute top-2 right-2 hidden lg:flex"
              aria-label={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              <ChevronRight
                className={`h-5 w-5 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
              <span className="sr-only">
                {isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
              </span>
            </Button>
          )}
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
