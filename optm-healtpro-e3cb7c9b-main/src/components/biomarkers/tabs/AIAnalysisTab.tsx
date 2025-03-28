
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lightbulb, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MedicalReportAI from '@/components/biomarkers/MedicalReportAI';
import { MedicalAnalysis } from '@/types/medicalData';

interface AIAnalysisTabProps {
  onAnalysisComplete: (analysis: MedicalAnalysis) => void;
}

const AIAnalysisTab: React.FC<AIAnalysisTabProps> = ({ onAnalysisComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6"
    >
      {/* Main AI Report Analysis Card - Full Width */}
      <div className="w-full">
        <MedicalReportAI onAnalysisComplete={onAnalysisComplete} />
      </div>
      
      {/* Three Equal Sized Cards Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AIHowItWorksCard />
        <AIPrivacyCard />
        <AIQuickTipsCard />
      </div>
    </motion.div>
  );
};

const AIHowItWorksCard: React.FC = () => {
  return (
    <Card className="border border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader className="bg-primary/5 pb-2 p-4 md:p-5">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          How It Works
        </CardTitle>
        <CardDescription>Understanding report analysis</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">1</div>
          <div>
            <h4 className="font-medium">Upload your medical report</h4>
            <p className="text-sm text-muted-foreground">Upload lab results, imaging reports, or any other medical documents.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">2</div>
          <div>
            <h4 className="font-medium">AI analyzes your report</h4>
            <p className="text-sm text-muted-foreground">Our AI system reviews the medical terminology and data in your report.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">3</div>
          <div>
            <h4 className="font-medium">Get a plain-language explanation</h4>
            <p className="text-sm text-muted-foreground">Receive a clear breakdown of what your results mean and what actions you might consider.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AIPrivacyCard: React.FC = () => {
  return (
    <Card className="border border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader className="bg-primary/5 pb-2 p-4 md:p-5">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Privacy Information
        </CardTitle>
        <CardDescription>How we protect your data</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">
          Your medical data is important and sensitive. Here's how we protect it:
        </p>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <div className="bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 rounded-full p-0.5 shrink-0 mt-0.5">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>End-to-end encryption for all uploads</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 rounded-full p-0.5 shrink-0 mt-0.5">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Documents processed locally, not stored</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 rounded-full p-0.5 shrink-0 mt-0.5">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>HIPAA-compliant processing</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

const AIQuickTipsCard: React.FC = () => {
  return (
    <Card className="border border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader className="bg-primary/5 pb-2 p-4 md:p-5">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          Quick Tips
        </CardTitle>
        <CardDescription>Get the most from your analysis</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-5">
        <ul className="text-sm space-y-3">
          <li className="flex items-start gap-2">
            <div className="bg-accent/10 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">1</div>
            <span>Upload clear, complete reports for the best analysis results</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-accent/10 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">2</div>
            <span>Use text input mode for typed lab results or copied text</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-accent/10 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">3</div>
            <span>Save your analyses to track changes in your results over time</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-accent/10 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">4</div>
            <span>Use AI insights to prepare questions for your healthcare provider</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisTab;
