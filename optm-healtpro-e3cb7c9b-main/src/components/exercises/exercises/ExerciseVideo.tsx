
import React from 'react';
import { Exercise } from '@/types/exercise.types';

interface ExerciseVideoProps {
  exercise: Exercise;
}

const ExerciseVideo: React.FC<ExerciseVideoProps> = ({ exercise }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
      <div className="aspect-video relative bg-muted flex items-center justify-center">
        {exercise.videoUrl ? (
          <video 
            className="w-full h-full object-cover" 
            controls
            poster={exercise.thumbnailUrl || '/placeholder.svg'} 
          >
            <source src={exercise.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-center p-6">
            <img 
              src={exercise.thumbnailUrl || '/placeholder.svg'} 
              alt={exercise.title} 
              className="max-h-64 mx-auto mb-4"
            />
            <p className="text-muted-foreground">
              Video demonstration not available for this exercise
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseVideo;
