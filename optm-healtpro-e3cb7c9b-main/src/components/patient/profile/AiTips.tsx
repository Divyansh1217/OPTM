
import React from 'react';
import AiTip from './AiTip';

interface AiTipsProps {
  patientId: number;
  tips?: Array<{
    id: number;
    text: string;
    action: string;
    actionLink: string;
  }>;
}

const AiTips: React.FC<AiTipsProps> = ({ patientId, tips }) => {
  // For demo purposes, if no tips are provided, use these default ones
  const defaultTips = [
    {
      id: 1,
      text: "Patient's blood pressure has been consistently elevated. Consider reviewing medication.",
      action: "View blood pressure history",
      actionLink: "#"
    },
    {
      id: 2,
      text: "Annual wellness check-up is due in the next 30 days.",
      action: "Schedule appointment",
      actionLink: "#"
    }
  ];

  const displayTips = tips || defaultTips;

  return (
    <div>
      <h3 className="font-medium text-sm mb-3">AI tips</h3>
      <div className="space-y-3">
        {displayTips.map((tip) => (
          <AiTip 
            key={tip.id}
            id={tip.id}
            text={tip.text}
            action={tip.action}
            actionLink={tip.actionLink}
          />
        ))}
      </div>
    </div>
  );
};

export default AiTips;
