
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit } from 'lucide-react';
import { Question } from '../types';

interface AnswerContentProps {
  question: Question;
}

const AnswerContent: React.FC<AnswerContentProps> = ({ question }) => {
  return (
    <>
      <div className="flex items-start gap-2">
        <Badge variant="outline" className="shrink-0 mt-0.5 bg-primary/5 text-primary text-xs">
          <BrainCircuit className="h-3 w-3 mr-1" />
          AI
        </Badge>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-2">{question.answer}</p>
          
          {question.sources && question.sources.length > 0 && (
            <div className="mt-2">
              <p className="text-[11px] text-muted-foreground/70 font-medium">Sources:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {question.sources.map((source, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px]">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerContent;
