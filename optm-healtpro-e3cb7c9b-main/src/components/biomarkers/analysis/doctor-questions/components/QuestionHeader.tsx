
import React from 'react';
import { BookmarkPlus, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Question } from '../types';

interface QuestionHeaderProps {
  question: Question;
  index: number;
  handleToggleFavorite: () => void;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  question,
  index,
  handleToggleFavorite
}) => {
  return (
    <div className="flex items-start gap-2 p-3 bg-muted/30">
      <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium">{question.text}</p>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 ml-2"
            onClick={handleToggleFavorite}
            title={question.favorited ? "Remove from favorites" : "Save to favorites"}
          >
            {question.favorited ? (
              <Bookmark className="h-4 w-4 text-amber-500" />
            ) : (
              <BookmarkPlus className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionHeader;
