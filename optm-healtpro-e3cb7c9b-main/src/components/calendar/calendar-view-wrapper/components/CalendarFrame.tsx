
import React, { forwardRef } from 'react';

interface CalendarFrameProps {
  src: string;
  onLoad: () => void;
  onError: (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
}

// Using forwardRef to properly handle the ref passed from parent component
const CalendarFrame = forwardRef<HTMLIFrameElement, CalendarFrameProps>(
  ({ src, onLoad, onError }, ref) => {
    return (
      <iframe 
        ref={ref}
        src={src}
        className="w-full h-full border-0"
        frameBorder="0" 
        scrolling="no"
        title="Google Calendar"
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
);

// Display name for debugging purposes
CalendarFrame.displayName = 'CalendarFrame';

export default CalendarFrame;
