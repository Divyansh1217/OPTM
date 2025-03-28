
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from './types';
import { generateAIAnswer } from './utils';
import { toast } from 'sonner';

// Import smaller components
import QuestionHeader from './components/QuestionHeader';
import AskButton from './components/AskButton';
import AnswerContent from './components/AnswerContent';
import AnswerFooter from './components/AnswerFooter';

interface QuestionItemProps {
  question: Question;
  index: number;
  isGeneratingAnswer: boolean;
  setIsGeneratingAnswer: (value: boolean) => void;
  onUpdateQuestion: (index: number, updatedQuestion: Question) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  isGeneratingAnswer,
  setIsGeneratingAnswer,
  onUpdateQuestion,
}) => {
  const handleAskExisting = async () => {
    setIsGeneratingAnswer(true);
    const { answer, sources } = await generateAIAnswer(question.text);
    onUpdateQuestion(index, { 
      ...question, 
      answer, 
      sources,
      votes: { helpful: 0, notHelpful: 0 },
      userVoted: null
    });
    setIsGeneratingAnswer(false);
  };

  const handleVote = (voteType: 'helpful' | 'notHelpful') => {
    // Don't allow changing vote type
    if (question.userVoted === voteType) return;

    const currentVotes = question.votes || { helpful: 0, notHelpful: 0 };
    let newVotes = { ...currentVotes };

    // If user already voted, decrement their previous vote
    if (question.userVoted) {
      newVotes[question.userVoted] = Math.max(0, newVotes[question.userVoted] - 1);
    }
    
    // Increment the new vote
    newVotes[voteType] = newVotes[voteType] + 1;

    onUpdateQuestion(index, {
      ...question,
      votes: newVotes,
      userVoted: voteType
    });

    toast[voteType === 'helpful' ? 'success' : 'info'](
      voteType === 'helpful' 
        ? "Thank you for your feedback! We're glad this was helpful." 
        : "Thank you for your feedback. We'll work to improve our answers.", 
      { duration: 3000 }
    );
  };

  const handleToggleFavorite = () => {
    const isFavorited = !question.favorited;
    
    onUpdateQuestion(index, {
      ...question,
      favorited: isFavorited
    });

    toast.success(
      isFavorited 
        ? "Question saved to favorites." 
        : "Question removed from favorites.", 
      { duration: 2000 }
    );
  };

  return (
    <Card key={index} className="overflow-hidden border border-border/50">
      <CardContent className="p-0">
        <QuestionHeader 
          question={question} 
          index={index} 
          handleToggleFavorite={handleToggleFavorite} 
        />
        
        {!question.answer && (
          <div className="pl-10 pb-3">
            <AskButton 
              onClick={handleAskExisting} 
              isGeneratingAnswer={isGeneratingAnswer} 
            />
          </div>
        )}
        
        {question.answer && (
          <div className="p-3 border-t border-border/30 bg-background/80">
            <AnswerContent question={question} />
            <AnswerFooter question={question} handleVote={handleVote} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionItem;
