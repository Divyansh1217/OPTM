
import React from 'react';
import { Search } from 'lucide-react';

interface KeyFindingsProps {
  findings: string[];
}

const KeyFindings: React.FC<KeyFindingsProps> = ({ findings }) => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <Search className="w-5 h-5 mr-2" />
        Key Findings
      </h3>
      <ul className="list-disc pl-5 space-y-1">
        {findings.map((finding, index) => (
          <li key={index} className="text-muted-foreground">{finding}</li>
        ))}
      </ul>
    </div>
  );
};

export default KeyFindings;
