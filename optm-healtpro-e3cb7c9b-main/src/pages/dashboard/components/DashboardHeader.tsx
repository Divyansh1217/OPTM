
import React, { memo } from 'react';
import { Search, Bell, MessageSquare, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  doctorName: string;
}

// Memoize the component to prevent unnecessary re-renders
const DashboardHeader: React.FC<DashboardHeaderProps> = memo(({ doctorName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 pointer-events-auto"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hi, Dr. {doctorName}. Welcome back to your clinic dashboard!
        </p>
      </div>
      
      <div className="flex items-center mt-2 md:mt-0 gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input 
            placeholder="Search patients, records..." 
            className="pl-9 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 backdrop-blur-sm rounded-xl pointer-events-auto"
          />
        </div>
        
        <div className="flex items-center gap-2 ml-2 pointer-events-auto">
          <Button variant="outline" size="icon" className="relative h-9 w-9 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <Bell className="h-4 w-4 text-blue-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              4
            </span>
          </Button>
          
          <Button variant="outline" size="icon" className="relative h-9 w-9 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <MessageSquare className="h-4 w-4 text-indigo-500" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="outline" size="icon" className="h-9 w-9 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <Settings className="h-4 w-4 text-purple-500" />
          </Button>
          
          <div className="h-9 w-px bg-gray-200 dark:bg-gray-700/50 mx-1"></div>
          
          <Avatar className="h-9 w-9 ring-2 ring-white/50 dark:ring-gray-700/50">
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">DR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.div>
  );
});

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;
