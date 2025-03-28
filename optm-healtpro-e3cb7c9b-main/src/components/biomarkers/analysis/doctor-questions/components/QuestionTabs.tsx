
import React from 'react';
import { Bookmark, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Question } from '../types';
import QuestionsList from '../QuestionsList';
import AddQuestionForm from '../AddQuestionForm';

interface QuestionTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  questions: Question[];
  filteredQuestions: Question[];
  newQuestion: string;
  setNewQuestion: (value: string) => void;
  isGeneratingAnswer: boolean;
  setIsGeneratingAnswer: (value: boolean) => void;
  setQuestions: (questions: Question[]) => void;
  handleAddQuestion: () => Promise<void>;
}

const QuestionTabs: React.FC<QuestionTabsProps> = ({
  activeTab,
  setActiveTab,
  isAdding,
  setIsAdding,
  questions,
  filteredQuestions,
  newQuestion,
  setNewQuestion,
  isGeneratingAnswer,
  setIsGeneratingAnswer,
  setQuestions,
  handleAddQuestion
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-2">
        <TabsList className="bg-muted/30">
          <TabsTrigger value="all" className="text-sm">All Questions</TabsTrigger>
          <TabsTrigger value="favorites" className="text-sm">
            <Bookmark className="h-3.5 w-3.5 mr-1" />
            Favorites
          </TabsTrigger>
        </TabsList>
        
        {/* Add question button (only shown when not adding) */}
        {!isAdding && (
          <Button 
            onClick={() => setIsAdding(true)} 
            variant="outline" 
            size="sm"
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        )}
      </div>
      
      <TabsContent value="all" className="mt-0">
        {/* Question editor (shown when adding) */}
        {isAdding && (
          <AddQuestionForm
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            isGeneratingAnswer={isGeneratingAnswer}
            onAddQuestion={handleAddQuestion}
            onCancel={() => {
              setIsAdding(false);
              setNewQuestion('');
            }}
          />
        )}
        
        {/* Questions list */}
        <QuestionsList
          questions={filteredQuestions}
          isGeneratingAnswer={isGeneratingAnswer}
          setIsGeneratingAnswer={setIsGeneratingAnswer}
          setQuestions={setQuestions}
        />
      </TabsContent>
      
      <TabsContent value="favorites" className="mt-0">
        {filteredQuestions.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <QuestionsList
            questions={filteredQuestions}
            isGeneratingAnswer={isGeneratingAnswer}
            setIsGeneratingAnswer={setIsGeneratingAnswer}
            setQuestions={setQuestions}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

const EmptyFavorites = () => (
  <div className="text-center py-8 text-muted-foreground">
    <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-30" />
    <p>No favorite questions saved yet.</p>
    <p className="text-sm">Bookmark important questions to find them quickly later.</p>
  </div>
);

export default QuestionTabs;
