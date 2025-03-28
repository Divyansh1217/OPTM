
import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import {
  PatientListHeader,
  PatientSearch,
  PatientTableHeader,
  PatientTableRow,
  PatientsTable,
  PaginationFooter
} from './patients-list';
import { PatientStatistics } from './PatientStatistics';
import { Patient } from '../types';
import { Spinner } from '@/components/ui/spinner';

interface PatientsListProps {
  patients: Patient[];
  onViewPatient: (patientId: number) => void;
  isLoading?: boolean;
}

export const PatientsList: React.FC<PatientsListProps> = ({
  patients,
  onViewPatient,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'lastVisit' | 'condition'>('lastVisit');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter patients based on search term
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.icdCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  // Sort patients based on sort criteria
  const sortedPatients = useMemo(() => {
    return [...filteredPatients].sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'lastVisit') {
        // Parse dates for comparison
        const dateA = new Date(a.lastVisit).getTime();
        const dateB = new Date(b.lastVisit).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === 'asc' 
          ? a.condition.localeCompare(b.condition) 
          : b.condition.localeCompare(a.condition);
      }
    });
  }, [filteredPatients, sortBy, sortDirection]);

  // Handle sorting changes
  const handleSort = (column: 'name' | 'lastVisit' | 'condition') => {
    if (sortBy === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Show initial data loaded notification
  useEffect(() => {
    if (!isLoading && patients.length > 0) {
      toast.success("Patient data loaded", {
        description: "Viewing your patient list",
        duration: 3000
      });
    }
  }, [isLoading, patients.length]);

  // Show loading state if isLoading is true
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" className="mb-4" />
        <p className="text-muted-foreground">Loading patient data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PatientStatistics patients={patients} />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <PatientListHeader 
          title="Patient List"
          description="View and manage your patients"
        />
        
        <div className="p-5">
          <PatientSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          
          <PatientsTable patients={sortedPatients} onViewPatient={onViewPatient}>
            <PatientTableHeader handleSort={handleSort} sortBy={sortBy} sortDirection={sortDirection} />
            
            <tbody>
              {sortedPatients.length > 0 ? (
                sortedPatients.map(patient => (
                  <PatientTableRow 
                    key={patient.id}
                    patient={patient}
                    onViewPatient={onViewPatient}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No patients found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </PatientsTable>
          
          <PaginationFooter 
            totalCount={patients.length} 
            filteredCount={filteredPatients.length} 
          />
        </div>
      </div>
    </div>
  );
};
