
import React from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MedicalReportAIProps } from './types';
import UploadTab from './UploadTab';
import TextInputTab from './TextInputTab';
import AnalysisResultsTab from './AnalysisResultsTab';
import { useReportProcessing } from './hooks/useReportProcessing';
import { convertToReportAnalysis } from './utils/reportUtils';

const MedicalReportAI: React.FC<MedicalReportAIProps> = ({ onAnalysisComplete }) => {
  const {
    file,
    isProcessing,
    processingProgress,
    activeTab,
    textInput,
    error,
    lastAnalysis,
    isLoading,
    setActiveTab,
    handleFileChange,
    handleTextInputChange,
    handleProcessFile,
    handleProcessText
  } = useReportProcessing({ onAnalysisComplete });

  return (
    <Card className="w-full shadow-lg border border-border/30 rounded-lg transition-all duration-300 hover:shadow-xl overflow-hidden visible-card">
      <CardHeader className="bg-gradient-to-r from-primary/15 to-primary/5 pb-4 space-y-2">
        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl font-bold high-contrast-text">
          <Brain className="h-6 w-6 text-primary" />
          AI Medical Report Analysis
        </CardTitle>
        <CardDescription className="text-sm md:text-base opacity-90">
          Upload your medical report or paste its content for AI-powered analysis and explanation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-5 bg-white dark:bg-gray-800">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-5 w-full grid grid-cols-3 bg-muted/30 rounded-xl p-1">
            <TabsTrigger 
              value="upload" 
              className="text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Upload Report
            </TabsTrigger>
            <TabsTrigger 
              value="text-input"
              className="text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Text Input
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              disabled={!lastAnalysis}
              className="text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Results
            </TabsTrigger>
          </TabsList>
          
          <div className="min-h-[300px] md:min-h-[380px] relative">
            <TabsContent value="upload" className="mt-0 absolute inset-0 h-full visible-content">
              <UploadTab 
                file={file}
                isProcessing={isProcessing || isLoading}
                processingProgress={processingProgress}
                onFileChange={handleFileChange}
                onProcessFile={handleProcessFile}
              />
            </TabsContent>
            
            <TabsContent value="text-input" className="mt-0 absolute inset-0 h-full visible-content">
              <TextInputTab 
                textInput={textInput}
                isProcessing={isProcessing || isLoading}
                processingProgress={processingProgress}
                onTextInputChange={handleTextInputChange}
                onProcessText={handleProcessText}
              />
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-0 absolute inset-0 h-full overflow-y-auto visible-content">
              {lastAnalysis && (
                <AnalysisResultsTab 
                  analysis={convertToReportAnalysis(lastAnalysis)} 
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
        
        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start text-xs bg-gray-50 dark:bg-gray-900/10 px-4 md:px-6 py-3 border-t border-border/30">
        <p className="text-muted-foreground">Note: This AI analysis is not a substitute for professional medical advice. Always consult with your healthcare provider about your test results.</p>
      </CardFooter>
    </Card>
  );
};

export default MedicalReportAI;
