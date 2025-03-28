
import React from 'react';
import { useAuth } from '@/contexts/auth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, CalendarDays, BarChart2, Activity, Brain, Pill, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorDashboard: React.FC = () => {
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Doctor Dashboard</h1>
                <p className="text-sm text-muted-foreground">Control your practice and patient care in one interface</p>
              </div>
              <div className="flex items-center gap-2 bg-white/30 dark:bg-gray-800/30 p-2 rounded-xl backdrop-blur-md border border-white/20 dark:border-white/5">
                <span className="text-sm font-medium">Welcome, {user?.name || 'Doctor'}</span>
                <Button variant="outline" size="sm" onClick={() => logout()} className="bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80">
                  Sign Out
                </Button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Patients", value: "42", icon: <Users className="h-5 w-5 text-blue-500" />, color: "from-blue-500 to-indigo-600" },
                { title: "Pending Reports", value: "8", icon: <FileText className="h-5 w-5 text-purple-500" />, color: "from-purple-500 to-pink-600" },
                { title: "Today's Appointments", value: "5", icon: <CalendarDays className="h-5 w-5 text-emerald-500" />, color: "from-emerald-500 to-teal-600" },
                { title: "Patient Improvement", value: "76%", icon: <BarChart2 className="h-5 w-5 text-amber-500" />, color: "from-amber-500 to-orange-600" }
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
                  <CardHeader className="bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b border-white/20 dark:border-white/5">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Recent Patients
                    </CardTitle>
                    <CardDescription>Your most recently viewed patient records</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/30">
                      {[
                        { name: "Emma Thompson", time: "10:30 AM", issue: "Shoulder pain" },
                        { name: "James Wilson", time: "Yesterday", issue: "Lower back assessment" },
                        { name: "Sophia Chen", time: "2 days ago", issue: "Post-surgery check" }
                      ].map((patient, i) => (
                        <div key={i} className="p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200">
                          <div className="flex justify-between">
                            <p className="font-medium">{patient.name}</p>
                            <span className="text-xs text-muted-foreground">{patient.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{patient.issue}</p>
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
                  <CardHeader className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 border-b border-white/20 dark:border-white/5">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-purple-500" />
                      Upcoming Appointments
                    </CardTitle>
                    <CardDescription>Your scheduled appointments for the next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/30">
                      {[
                        { name: "Alex Johnson", time: "Today, 2:00 PM", type: "Initial Consultation" },
                        { name: "Maria Garcia", time: "Tomorrow, 9:15 AM", type: "Follow-up" },
                        { name: "Robert Lee", time: "Fri, 11:30 AM", type: "Physical Assessment" }
                      ].map((appointment, i) => (
                        <div key={i} className="p-4 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-200">
                          <div className="flex justify-between">
                            <p className="font-medium">{appointment.name}</p>
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">{appointment.type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.time}</p>
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
                    <Brain className="h-5 w-5 text-emerald-500" />
                    Medical AI Insights
                  </CardTitle>
                  <CardDescription>AI-powered analysis of your practice and patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: "Treatment Efficacy", value: "87%", icon: <Pill className="h-4 w-4 text-emerald-500" />, desc: "Above average success rate" },
                      { title: "Patient Satisfaction", value: "92%", icon: <Users className="h-4 w-4 text-blue-500" />, desc: "Based on recent feedback" },
                      { title: "Health Trends", value: "Positive", icon: <Shield className="h-4 w-4 text-purple-500" />, desc: "Improved outcomes detected" }
                    ].map((item, i) => (
                      <div key={i} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 p-4 rounded-xl border border-white/20 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-700/80">
                            {item.icon}
                          </div>
                          <h3 className="text-sm font-medium">{item.title}</h3>
                        </div>
                        <p className="text-xl font-bold">{item.value}</p>
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

export default DoctorDashboard;
