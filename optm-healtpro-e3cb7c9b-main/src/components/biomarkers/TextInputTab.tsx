
import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

interface TextInputTabProps {
  textInput: string;
  isProcessing: boolean;
  processingProgress: number;
  onTextInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onProcessText: () => void;
}

const TextInputTab: React.FC<TextInputTabProps> = ({
  textInput,
  isProcessing,
  processingProgress,
  onTextInputChange,
  onProcessText
}) => {
  return (
    <div className="space-y-5 h-full flex flex-col">
      <div className="flex-grow">
        <Textarea 
          placeholder="Paste your medical report text here (e.g., 'Cholesterol: 210 mg/dL, HDL: 65 mg/dL, LDL: 130 mg/dL...')"
          className="w-full h-full min-h-[240px] resize-none p-4 font-mono text-sm border border-gray-200 dark:border-gray-800/50 rounded-xl focus:ring-1 focus:ring-primary/30"
          value={textInput}
          onChange={onTextInputChange}
        />
      </div>
      
      {isProcessing ? (
        <div className="space-y-2 bg-white dark:bg-gray-800/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800/30 shadow-sm">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Analyzing your report...</span>
            <span className="text-primary font-medium">{Math.round(processingProgress)}%</span>
          </div>
          <Progress value={processingProgress} className="h-2 bg-gray-100" />
          <div className="text-xs text-muted-foreground mt-2">
            Our AI is examining your medical data and preparing an easy-to-understand explanation
          </div>
        </div>
      ) : (
        <Button 
          className="w-full transition-all bg-gradient-to-r from-primary to-primary/90 rounded-full py-6 shadow-sm" 
          onClick={onProcessText}
          disabled={!textInput.trim()}
          size="lg"
        >
          <Zap className="mr-2 h-4 w-4" />
          Analyze Text
        </Button>
      )}
    </div>
  );
};

export default TextInputTab;
