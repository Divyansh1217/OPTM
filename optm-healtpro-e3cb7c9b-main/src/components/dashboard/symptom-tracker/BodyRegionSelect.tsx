
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BodyRegionSelectProps, bodyRegions } from './types';

const BodyRegionSelect: React.FC<BodyRegionSelectProps> = ({ location, onChange }) => {
  return (
    <Select
      value={location}
      onValueChange={onChange}
    >
      <SelectTrigger id="location">
        <SelectValue placeholder="Select body part" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Body Parts</SelectLabel>
          {bodyRegions.map(region => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BodyRegionSelect;
