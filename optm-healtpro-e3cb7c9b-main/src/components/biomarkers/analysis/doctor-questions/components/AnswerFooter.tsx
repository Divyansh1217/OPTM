
import React from 'react';
import { AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Question } from '../types';

interface AnswerFooterProps {
  question: Question;
  handleVote: (voteType: 'helpful' | 'notHelpful') => void;
}

const AnswerFooter: React.FC<AnswerFooterProps> = ({
  question,
  handleVote
}) => {
  return (
    <div className="flex flex-col gap-2 mt-3 pt-2 border-t border-border/20">
      <div className="flex items-start gap-1">
        <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[10px] italic text-muted-foreground/70">
          This is an AI-generated response for informational purposes only. 
          Please verify with your healthcare provider or call +91-9555-9555 for expert assistance.
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <p className="text-[10px] text-muted-foreground mr-1">Was this answer helpful?</p>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={question.userVoted === 'helpful' ? 'default' : 'outline'}
            className={`h-6 px-2 text-xs ${question.userVoted === 'helpful' ? 'bg-green-500 hover:bg-green-600' : ''}`}
            onClick={() => handleVote('helpful')}
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            {question.votes?.helpful || 0}
          </Button>
          <Button
            size="sm"
            variant={question.userVoted === 'notHelpful' ? 'default' : 'outline'}
            className={`h-6 px-2 text-xs ${question.userVoted === 'notHelpful' ? 'bg-red-500 hover:bg-red-600' : ''}`}
            onClick={() => handleVote('notHelpful')}
          >
            <ThumbsDown className="h-3 w-3 mr-1" />
            {question.votes?.notHelpful || 0}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerFooter;
