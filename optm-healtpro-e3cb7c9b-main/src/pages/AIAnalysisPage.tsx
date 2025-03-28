
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AIAnalysisTab from '@/components/biomarkers/tabs/AIAnalysisTab';
import { MedicalAnalysis } from '@/types/medicalData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { MedicalDataProvider } from '@/contexts/MedicalDataContext';

const AIAnalysisPage: React.FC = () => {
  const { toast } = useToast();

  const handleReportAnalysisComplete = (analysis: MedicalAnalysis) => {
    console.log("Report analysis completed:", analysis);
    
    toast({
      title: "Analysis Saved",
      description: "Your medical report analysis has been saved to your profile",
    });
  };

  return (
    <MedicalDataProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-background to-background/80">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 pl-10 lg:pl-0"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">AI Report Analysis</h1>
              <p className="text-sm text-muted-foreground">
                Upload your medical reports for AI-powered analysis and explanations
              </p>
            </motion.div>
            
            <div className="max-w-7xl mx-auto">
              <AIAnalysisTab onAnalysisComplete={handleReportAnalysisComplete} />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6"
              >
                <Card className="border border-primary/20 shadow-md">
                  <CardHeader className="bg-primary/5 pb-2 p-4 md:p-5">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Important Note
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-5">
                    <p className="text-sm text-muted-foreground">
                      The AI analysis is meant to help you understand your medical reports better, but it is not a substitute for professional medical advice.
                      Always consult with your healthcare provider about your test results and any health concerns.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </MedicalDataProvider>
  );
};

export default AIAnalysisPage;
