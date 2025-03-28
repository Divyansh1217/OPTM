
import React from 'react';
import { motion } from 'framer-motion';
import BiomarkerDisplay from '@/components/dashboard/BiomarkerDisplay';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Biomarker } from '@/components/dashboard/biomarker-display/types';
import BiomarkerSort from './biomarker-view/BiomarkerSort';
import BiomarkerHeader from './biomarker-view/BiomarkerHeader';
import BiomarkerInfo from './biomarker-view/BiomarkerInfo';
import { useBiomarkerData } from './biomarker-view/useBiomarkerData';

interface ViewBiomarkersTabProps {
  biomarkers: Biomarker[];
}

const ViewBiomarkersTab: React.FC<ViewBiomarkersTabProps> = ({ biomarkers }) => {
  const {
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
  } = useBiomarkerData(biomarkers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <BiomarkerHeader
              latestUpdate={latestUpdate}
              totalBiomarkers={totalBiomarkers}
              normalCount={normalCount}
              elevatedCount={elevatedCount}
              lowCount={lowCount}
              criticalCount={criticalCount}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </CardHeader>
          
          <CardContent>
            {biomarkers.length > 0 && (
              <div className="mb-6 flex justify-end items-center">
                <BiomarkerSort sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            )}
            
            <BiomarkerDisplay biomarkers={sortedBiomarkers} />
            
            {biomarkers.length > 0 && <BiomarkerInfo />}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ViewBiomarkersTab;
