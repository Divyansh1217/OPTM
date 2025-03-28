
import React, { Suspense } from 'react';
import { ComponentSkeleton } from './ComponentSkeleton';

// Use dynamic imports for the heavy components
const PatientProfileCard = React.lazy(() => import('@/components/patient-dashboard/PatientProfileCard'));
const AnatomicalBodyMap = React.lazy(() => import('@/components/patient-dashboard/AnatomicalBodyMap'));

interface ProfileAndAnatomySectionProps {
  name: string;
  patientId: string;
  age: number;
}

const ProfileAndAnatomySection: React.FC<ProfileAndAnatomySectionProps> = ({ 
  name, 
  patientId, 
  age 
}) => {
  return (
    <div className="grid md:grid-cols-12 gap-4">
      <div className="md:col-span-4">
        <Suspense fallback={<ComponentSkeleton />}>
          <PatientProfileCard
            name={name}
            patientId={patientId}
            age={age}
          />
        </Suspense>
      </div>
      <div className="md:col-span-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full overflow-hidden">
          <Suspense fallback={<ComponentSkeleton />}>
            <AnatomicalBodyMap />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndAnatomySection;
