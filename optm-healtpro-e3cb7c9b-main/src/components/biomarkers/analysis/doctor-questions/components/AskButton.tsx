
import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface AskButtonProps {
  onClick: () => Promise<void>;
  isGeneratingAnswer: boolean;
}

const AskButton: React.FC<AskButtonProps> = ({
  onClick,
  isGeneratingAnswer
}) => {
  return (
    <Button 
      onClick={onClick} 
      variant="ghost" 
      size="sm" 
      className="mt-1 h-7 text-xs"
      disabled={isGeneratingAnswer}
    >
      {isGeneratingAnswer ? (
        <>
          <Spinner className="h-3 w-3 mr-1" />
          Generating answer...
        </>
      ) : (
        <>
          <BrainCircuit className="h-3 w-3 mr-1" />
          Get AI Answer
        </>
      )}
    </Button>
  );
};

export default AskButton;
