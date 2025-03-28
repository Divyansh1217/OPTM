
import React, { useState } from 'react';
import { BrainCircuit, Search, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <Card className="bg-primary/5 border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          Ask Us Any Question
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search medical questions or ask something new..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <div className="flex justify-between items-center">
            <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
              <BrainCircuit className="h-4 w-4 mr-1" />
              Get AI Answer
            </Button>
            <div className="flex items-center text-xs text-muted-foreground">
              <Phone className="h-3 w-3 mr-1 text-primary" />
              For expert assistance, call +91-9555-9555
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
