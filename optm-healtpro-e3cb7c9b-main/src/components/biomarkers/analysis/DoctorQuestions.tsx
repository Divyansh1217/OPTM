
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Question } from './doctor-questions/types';
import { generateAIAnswer } from './doctor-questions/utils';
import SearchForm from './doctor-questions/SearchForm';

// Import our new component files
import QuestionsHeader from './doctor-questions/components/QuestionsHeader';
import QuestionTabs from './doctor-questions/components/QuestionTabs';
import ExpertAssistance from './doctor-questions/components/ExpertAssistance';

const DoctorQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      text: "Should I be concerned about my LDL cholesterol level?",
      answer: "Based on your LDL level of 130 mg/dL, which is borderline high (optimal is <100 mg/dL), some concern is warranted but it's not an emergency. Consider discussing dietary changes with your doctor and possibly scheduling another test in 3-6 months to monitor changes.",
      sources: ["American Heart Association", "Mayo Clinic"],
      favorited: true
    },
    {
      text: "What diet changes would you recommend based on these results?",
      answer: "Your cholesterol levels suggest reducing saturated fats (red meat, full-fat dairy) and increasing fiber (oats, beans, fruits, vegetables). Adding heart-healthy fats like olive oil, avocados and nuts may help improve your HDL/LDL ratio. Your doctor can provide personalized recommendations.",
      sources: ["Harvard Health Publication", "Cleveland Clinic"]
    }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleAddQuestion = async () => {
    if (newQuestion.trim()) {
      setIsGeneratingAnswer(true);
      const { answer, sources } = await generateAIAnswer(newQuestion.trim());
      setQuestions([...questions, { text: newQuestion.trim(), answer, sources }]);
      setNewQuestion('');
      setIsAdding(false);
      setIsGeneratingAnswer(false);
    }
  };

  const handleSearch = (query: string) => {
    setNewQuestion(query);
    setIsAdding(true);
  };

  const filteredQuestions = activeTab === 'favorites' 
    ? questions.filter(q => q.favorited) 
    : questions;

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border/50">
      <div className="flex flex-col space-y-4">
        {/* Title Header */}
        <QuestionsHeader title="Questions for Your Doctor" />
        
        {/* AI Search */}
        <SearchForm onSearch={handleSearch} />
        
        {/* Tabs for All/Favorites questions */}
        <QuestionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          questions={questions}
          filteredQuestions={filteredQuestions}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          isGeneratingAnswer={isGeneratingAnswer}
          setIsGeneratingAnswer={setIsGeneratingAnswer}
          setQuestions={setQuestions}
          handleAddQuestion={handleAddQuestion}
        />
      </div>
      
      <Separator className="my-2" />
      
      {/* Expert assistance information */}
      <ExpertAssistance />
    </div>
  );
};

export default DoctorQuestions;
