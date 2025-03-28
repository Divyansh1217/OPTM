
import React from 'react';
import { Question } from './types';
import QuestionItem from './QuestionItem';

interface QuestionsListProps {
  questions: Question[];
  isGeneratingAnswer: boolean;
  setIsGeneratingAnswer: (value: boolean) => void;
  setQuestions: (questions: Question[]) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  isGeneratingAnswer,
  setIsGeneratingAnswer,
  setQuestions,
}) => {
  const handleUpdateQuestion = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-2">Questions</h4>
      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            index={index}
            isGeneratingAnswer={isGeneratingAnswer}
            setIsGeneratingAnswer={setIsGeneratingAnswer}
            onUpdateQuestion={handleUpdateQuestion}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
