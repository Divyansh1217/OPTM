
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import DoctorAppointments from './components/DoctorAppointments';
import PatientDashboard from './components/PatientDashboard';
import { hasRole } from '@/contexts/auth/utils/rolePermissions';
import { Spinner } from '@/components/ui/spinner';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRoles = async () => {
      try {
        const doctorRole = await hasRole('doctor');
        const patientRole = await hasRole('patient');
        
        setIsDoctor(doctorRole);
        setIsPatient(patientRole);
      } catch (error) {
        console.error('Error checking roles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      checkRoles();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p>You need to be signed in to view appointments.</p>
      </div>
    );
  }

  // Render appropriate dashboard based on user role
  return isDoctor ? <DoctorAppointments /> : <PatientDashboard />;
};

export default AppointmentsPage;
