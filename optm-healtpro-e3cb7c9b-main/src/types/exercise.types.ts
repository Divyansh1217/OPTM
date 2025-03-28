
export interface Exercise {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string[];
  category: 'rehabilitation' | 'strength' | 'flexibility' | 'cardio' | 'squat';
  completionStatus?: 'completed' | 'in-progress' | 'not-started';
}

export interface MuscleGroup {
  id: string;
  name: string;
  progress: number;
}

export interface ProgressData {
  date: string;
  strength: number;
  flexibility: number;
  endurance: number;
}
