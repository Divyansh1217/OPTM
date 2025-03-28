
import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarResponsive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      // Auto-collapse sidebar on small screens
      if (isMobile) {
        setIsOpen(false);
      } else if (!localStorage.getItem('sidebar-collapsed')) {
        // Only auto-expand on desktop if user hasn't manually collapsed it
        setIsOpen(true);
      }
    };
    
    checkIfMobile();
  }, [isMobile]);

  // Toggle sidebar and remember state in localStorage
  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      
      // Only save state to localStorage on desktop
      if (!isMobile) {
        if (newState) {
          localStorage.removeItem('sidebar-collapsed');
        } else {
          localStorage.setItem('sidebar-collapsed', 'true');
        }
      }
      
      console.log(`Toggling sidebar: ${prev} → ${newState}, isMobile: ${isMobile}`);
      return newState;
    });
  }, [isMobile]);

  return {
    isOpen,
    setIsOpen,
    isMobile,
    toggleSidebar
  };
};
