
import React from 'react';
import { ReportAnalysis } from './types';
import ReportSummary from './analysis/ReportSummary';
import KeyFindings from './analysis/KeyFindings';
import BiomarkerValues from './analysis/BiomarkerValues';
import Recommendations from './analysis/Recommendations';
import DoctorQuestions from './analysis/DoctorQuestions';

interface AnalysisResultsTabProps {
  analysis: ReportAnalysis;
}

const AnalysisResultsTab: React.FC<AnalysisResultsTabProps> = ({ analysis }) => {
  return (
    <div className="space-y-6 h-full overflow-y-auto pr-1 pb-6">
      <ReportSummary summary={analysis.summary} />
      <KeyFindings findings={analysis.keyFindings} />
      <BiomarkerValues values={analysis.normalValues} />
      <Recommendations recommendations={analysis.recommendations} />
      <DoctorQuestions />
    </div>
  );
};

export default AnalysisResultsTab;
