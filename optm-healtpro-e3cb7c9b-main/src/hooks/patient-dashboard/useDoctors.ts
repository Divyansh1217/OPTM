
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        
        // Use mock data instead of attempting to query a non-existent table
        const mockDoctors: Doctor[] = [
          { id: 'doc-1', name: 'Dr. John Smith', specialty: 'Cardiology', avatarUrl: '/lovable-uploads/doctor-smith.png' },
          { id: 'doc-2', name: 'Dr. Sarah Johnson', specialty: 'Neurology', avatarUrl: '/lovable-uploads/doctor-johnson.png' },
          { id: 'doc-3', name: 'Dr. Michael Chen', specialty: 'Orthopedics', avatarUrl: '/lovable-uploads/doctor-chen.png' },
          { id: 'doc-4', name: 'Dr. Emily Wilson', specialty: 'Pediatrics', avatarUrl: '/lovable-uploads/doctor-wilson.png' }
        ];
        
        setDoctors(mockDoctors);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch doctors'));
        
        // Use demo data if there's an error
        setDoctors([
          { id: 'doc-1', name: 'Dr. John Smith', specialty: 'Cardiology', avatarUrl: '/lovable-uploads/doctor-smith.png' },
          { id: 'doc-2', name: 'Dr. Sarah Johnson', specialty: 'Neurology', avatarUrl: '/lovable-uploads/doctor-johnson.png' },
          { id: 'doc-3', name: 'Dr. Michael Chen', specialty: 'Orthopedics', avatarUrl: '/lovable-uploads/doctor-chen.png' },
          { id: 'doc-4', name: 'Dr. Emily Wilson', specialty: 'Pediatrics', avatarUrl: '/lovable-uploads/doctor-wilson.png' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, isLoading, error };
}
