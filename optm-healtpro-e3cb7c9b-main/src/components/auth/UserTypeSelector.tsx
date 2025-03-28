
import React from 'react';
import { Users, User, PhoneCall } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

interface UserTypeSelectorProps {
  userType: 'doctor' | 'patient' | 'receptionist';
  onTabChange: (value: string) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ 
  userType, 
  onTabChange 
}) => {
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <Tabs 
      defaultValue={userType} 
      className="mb-6"
      onValueChange={onTabChange}
    >
      <TabsList className="grid w-full grid-cols-3 p-1 rounded-xl bg-gray-100 dark:bg-gray-800/40">
        <TabsTrigger 
          value="patient" 
          className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm"
        >
          <User className="h-4 w-4" />
          <span className="hidden xs:inline">Patient</span>
        </TabsTrigger>
        <TabsTrigger 
          value="doctor" 
          className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm"
        >
          <Users className="h-4 w-4" />
          <span className="hidden xs:inline">Doctor</span>
        </TabsTrigger>
        <TabsTrigger 
          value="receptionist" 
          className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary data-[state=active]:shadow-sm"
        >
          <PhoneCall className="h-4 w-4" />
          <span className="hidden xs:inline">Reception</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="patient">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mt-3 text-center"
        >
          <h2 className="text-xl font-bold mb-1">Patient Login</h2>
          <p className="text-muted-foreground text-sm mb-3">View your health data and treatment progress</p>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="doctor">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mt-3 text-center"
        >
          <h2 className="text-xl font-bold mb-1">Doctor Login</h2>
          <p className="text-muted-foreground text-sm mb-3">Access patient records and treatment plans</p>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="receptionist">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mt-3 text-center"
        >
          <h2 className="text-xl font-bold mb-1">Receptionist Login</h2>
          <p className="text-muted-foreground text-sm mb-3">Manage appointments and front desk operations</p>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default UserTypeSelector;
