
import React from 'react';

interface QuestionsHeaderProps {
  title: string;
}

const QuestionsHeader: React.FC<QuestionsHeaderProps> = ({ title }) => {
  return (
    <h3 className="text-xl font-semibold text-center">{title}</h3>
  );
};

export default QuestionsHeader;
