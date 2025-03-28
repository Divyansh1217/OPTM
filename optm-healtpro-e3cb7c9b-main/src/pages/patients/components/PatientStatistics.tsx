
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Patient } from '../types';
import { Users, Calendar, Clock, Activity } from 'lucide-react';

interface PatientStatisticsProps {
  patients: Patient[];
}

export const PatientStatistics: React.FC<PatientStatisticsProps> = ({ patients }) => {
  // Calculate statistics
  const totalPatients = patients.length;
  
  const upcomingAppointments = patients.filter(patient => {
    if (!patient.nextVisit) return false;
    const nextVisit = new Date(patient.nextVisit);
    const today = new Date();
    const inTwoWeeks = new Date();
    inTwoWeeks.setDate(today.getDate() + 14);
    return nextVisit >= today && nextVisit <= inTwoWeeks;
  }).length;
  
  const recentVisits = patients.filter(patient => {
    if (!patient.lastVisit) return false;
    const lastVisit = new Date(patient.lastVisit);
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);
    return lastVisit >= twoWeeksAgo && lastVisit <= today;
  }).length;
  
  const activeConditions = [...new Set(patients.map(patient => patient.condition))].length;

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients,
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300'
    },
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments,
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300'
    },
    {
      title: 'Recent Visits',
      value: recentVisits,
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
      title: 'Active Conditions',
      value: activeConditions,
      icon: <Activity className="h-5 w-5 text-amber-600" />,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm border border-gray-200 dark:border-gray-700">
          <CardContent className="p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
