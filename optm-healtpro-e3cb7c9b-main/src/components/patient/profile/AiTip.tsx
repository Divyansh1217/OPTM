
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AiTipProps {
  id: number;
  text: string;
  action: string;
  actionLink: string;
}

const AiTip: React.FC<AiTipProps> = ({ id, text, action, actionLink }) => {
  return (
    <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex">
        <div className="mr-2 mt-0.5">
          {id === 1 ? 
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900">
              !
            </Badge> :
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-900">
              i
            </Badge>
          }
        </div>
        <div>
          <p className="text-sm">{text}</p>
          <a href={actionLink} className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block">
            {action}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AiTip;
