
import React from 'react';
import { useAuth } from '@/contexts/auth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CalendarDays, DollarSign, PackageCheck, Clock, MessageSquare, FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';

const ReceptionistDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full backdrop-blur-sm">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Receptionist Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage appointments and front desk operations</p>
              </div>
              <div className="flex items-center gap-2 bg-white/30 dark:bg-gray-800/30 p-2 rounded-xl backdrop-blur-md border border-white/20 dark:border-white/5">
                <span className="text-sm font-medium">Welcome, {user?.name || 'Receptionist'}</span>
                <Button variant="outline" size="sm" onClick={() => logout()} className="bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80">
                  Sign Out
                </Button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Today's Check-ins", value: "12", icon: <Users className="h-5 w-5 text-teal-500" />, color: "from-teal-500 to-emerald-600" },
                { title: "Pending Appointments", value: "23", icon: <CalendarDays className="h-5 w-5 text-blue-500" />, color: "from-blue-500 to-indigo-600" },
                { title: "Pending Payments", value: "4", icon: <DollarSign className="h-5 w-5 text-amber-500" />, color: "from-amber-500 to-orange-600" },
                { title: "Inventory Items", value: "156", icon: <PackageCheck className="h-5 w-5 text-purple-500" />, color: "from-purple-500 to-pink-600" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="overflow-hidden border border-white/20 dark:border-white/5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex justify-between items-center">
                        {item.title}
                        <div className={`p-2 rounded-full bg-gradient-to-br ${item.color} text-white`}>
                          {item.icon}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{item.value}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card className="h-full border border-white/20 dark:border-white/5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-teal-100/50 to-emerald-100/50 dark:from-teal-900/30 dark:to-emerald-900/30 border-b border-white/20 dark:border-white/5">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-teal-500" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>Appointments scheduled for today</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/30">
                      {[
                        { time: "09:00 AM", patient: "James Wilson", doctor: "Dr. Sarah Chen", type: "Check-up" },
                        { time: "10:30 AM", patient: "Emily Parker", doctor: "Dr. Michael Rodriguez", type: "Follow-up" },
                        { time: "01:15 PM", patient: "David Johnson", doctor: "Dr. Sarah Chen", type: "Initial Consultation" },
                        { time: "03:45 PM", patient: "Jessica Lee", doctor: "Dr. Robert Miller", type: "Treatment" }
                      ].map((appointment, i) => (
                        <div key={i} className="p-4 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-all duration-200">
                          <div className="flex justify-between">
                            <p className="font-medium">{appointment.patient}</p>
                            <span className="text-xs bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 px-2 py-0.5 rounded-full">{appointment.time}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{appointment.doctor}</span>
                            <span className="text-muted-foreground">{appointment.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card className="h-full border border-white/20 dark:border-white/5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b border-white/20 dark:border-white/5">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      Recent Check-ins
                    </CardTitle>
                    <CardDescription>Patients who recently checked in</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/30">
                      {[
                        { time: "08:45 AM", patient: "Thomas Brown", status: "Checked in", doctor: "Dr. Michael Rodriguez" },
                        { time: "09:10 AM", patient: "Michelle Davis", status: "In progress", doctor: "Dr. Sarah Chen" },
                        { time: "09:30 AM", patient: "Daniel Martinez", status: "Waiting", doctor: "Dr. Robert Miller" }
                      ].map((checkin, i) => (
                        <div key={i} className="p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200">
                          <div className="flex justify-between">
                            <p className="font-medium">{checkin.patient}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              checkin.status === "Checked in" ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200" :
                              checkin.status === "In progress" ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200" :
                              "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200"
                            }`}>{checkin.status}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{checkin.doctor}</span>
                            <span className="text-muted-foreground">{checkin.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Card className="border border-white/20 dark:border-white/5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    Front Desk Actions
                  </CardTitle>
                  <CardDescription>Quick access to common reception tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: "New Appointment", desc: "Schedule a new patient visit", icon: <CalendarDays className="h-4 w-4 text-blue-500" /> },
                      { title: "Patient Records", desc: "Access patient information", icon: <FileSearch className="h-4 w-4 text-teal-500" /> },
                      { title: "Process Payment", desc: "Handle patient billing", icon: <DollarSign className="h-4 w-4 text-amber-500" /> }
                    ].map((item, i) => (
                      <div key={i} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 p-4 rounded-xl border border-white/20 dark:border-white/5 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-700/80">
                            {item.icon}
                          </div>
                          <h3 className="text-sm font-medium">{item.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
