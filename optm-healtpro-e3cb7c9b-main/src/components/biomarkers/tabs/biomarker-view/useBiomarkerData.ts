
import { useState, useMemo } from 'react';
import { Biomarker } from '@/components/dashboard/biomarker-display/types';

export const useBiomarkerData = (biomarkers: Biomarker[]) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  // Calculate counts for the biomarker stats
  const totalBiomarkers = biomarkers.length;
  const normalCount = biomarkers.filter(b => b.status === 'normal').length;
  const elevatedCount = biomarkers.filter(b => b.status === 'elevated').length;
  const lowCount = biomarkers.filter(b => b.status === 'low').length;
  const criticalCount = biomarkers.filter(b => b.status === 'critical').length;
  
  // Calculate the latest update timestamp
  const latestUpdate = biomarkers.length > 0 
    ? new Date(Math.max(...biomarkers.map(b => new Date(b.timestamp).getTime()))).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'No data';

  // Filter biomarkers based on selected status
  const filteredBiomarkers = useMemo(() => {
    return biomarkers.filter(biomarker => {
      if (filterStatus === 'all') return true;
      return biomarker.status === filterStatus;
    });
  }, [biomarkers, filterStatus]);

  // Sort biomarkers based on selected sort criteria
  const sortedBiomarkers = useMemo(() => {
    return [...filteredBiomarkers].sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        // Sort by severity (critical > elevated > low > normal)
        const statusOrder = { critical: 3, elevated: 2, low: 1, normal: 0 };
        return statusOrder[b.status] - statusOrder[a.status];
      }
      return 0;
    });
  }, [filteredBiomarkers, sortBy]);

  return {
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    totalBiomarkers,
    normalCount,
    elevatedCount,
    lowCount,
    criticalCount,
    latestUpdate,
    sortedBiomarkers
  };
};
