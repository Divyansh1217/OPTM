
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { BrainCircuit } from 'lucide-react';

interface AddQuestionFormProps {
  newQuestion: string;
  setNewQuestion: (value: string) => void;
  isGeneratingAnswer: boolean;
  onAddQuestion: () => void;
  onCancel: () => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({
  newQuestion,
  setNewQuestion,
  isGeneratingAnswer,
  onAddQuestion,
  onCancel,
}) => {
  return (
    <div className="space-y-2 p-3 border rounded-md bg-muted/20">
      <Textarea
        placeholder="Type your medical question here..."
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        className="resize-none min-h-[80px]"
      />
      <div className="flex gap-2">
        <Button 
          onClick={onAddQuestion} 
          size="sm" 
          className="shrink-0"
          disabled={!newQuestion.trim() || isGeneratingAnswer}
        >
          {isGeneratingAnswer ? (
            <>
              <Spinner className="h-4 w-4 mr-1" />
              Generating...
            </>
          ) : (
            <>
              <BrainCircuit className="h-4 w-4 mr-1" />
              Ask & Save
            </>
          )}
        </Button>
        <Button 
          onClick={onCancel} 
          variant="ghost" 
          size="sm"
          className="shrink-0"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddQuestionForm;
