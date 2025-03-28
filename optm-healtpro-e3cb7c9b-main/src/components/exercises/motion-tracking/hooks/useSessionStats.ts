
import { useState, useRef, useEffect } from 'react';
import { MotionStats } from '@/lib/human/types';

// Define SessionStats interface to match both our usage and MotionStats
export interface SessionStats {
  totalReps: number;
  goodReps: number;
  badReps: number;
  caloriesBurned: number;
  startTime: number;
  lastUpdate: number;
  // Added fields to match MotionStats
  lastUpdated: number;
  accuracy: number;
  currentStreak: number;
  bestStreak: number;
}

// Initial stats
export const getInitialStats = (): SessionStats => ({
  totalReps: 0,
  goodReps: 0,
  badReps: 0,
  caloriesBurned: 0,
  startTime: Date.now(),
  lastUpdate: Date.now(),
  lastUpdated: Date.now(),
  accuracy: 0,
  currentStreak: 0,
  bestStreak: 0
});

// Convert SessionStats to MotionStats
export const toMotionStats = (stats: SessionStats): MotionStats => ({
  totalReps: stats.totalReps,
  goodReps: stats.goodReps,
  badReps: stats.badReps,
  caloriesBurned: stats.caloriesBurned,
  lastUpdated: stats.lastUpdate,
  accuracy: stats.accuracy || (stats.totalReps > 0 ? (stats.goodReps / stats.totalReps) * 100 : 0),
  currentStreak: stats.currentStreak || 0,
  bestStreak: stats.bestStreak || 0
});

// Update stats for good rep
export const updateStatsForGoodRep = (stats: SessionStats): SessionStats => {
  const newTotalReps = stats.totalReps + 1;
  const newGoodReps = stats.goodReps + 1;
  const newCurrentStreak = stats.currentStreak + 1;
  const newBestStreak = Math.max(stats.bestStreak, newCurrentStreak);
  
  return {
    ...stats,
    totalReps: newTotalReps,
    goodReps: newGoodReps,
    lastUpdate: Date.now(),
    lastUpdated: Date.now(),
    accuracy: (newGoodReps / newTotalReps) * 100,
    currentStreak: newCurrentStreak,
    bestStreak: newBestStreak
  };
};

// Update stats for bad rep
export const updateStatsForBadRep = (stats: SessionStats): SessionStats => {
  const newTotalReps = stats.totalReps + 1;
  const newBadReps = stats.badReps + 1;
  
  return {
    ...stats,
    totalReps: newTotalReps,
    badReps: newBadReps,
    lastUpdate: Date.now(),
    lastUpdated: Date.now(),
    accuracy: (stats.goodReps / newTotalReps) * 100,
    currentStreak: 0, // Reset streak on bad rep
    bestStreak: stats.bestStreak
  };
};

export const useSessionStats = () => {
  const [stats, setStats] = useState<SessionStats>(getInitialStats());
  
  // Update stats with calorie calculations
  useEffect(() => {
    const intervalId = setInterval(() => {
      setStats(prev => {
        const sessionDuration = (Date.now() - prev.startTime) / 1000; // in seconds
        
        // Simple calorie calculation based on activity level and duration
        // MET value for moderate exercise is around 5-7
        const met = 5; 
        const weight = 70; // kg, default value
        const caloriesPerMinute = (met * 3.5 * weight) / 200; 
        const burnedCalories = (caloriesPerMinute * sessionDuration) / 60;
        
        return {
          ...prev,
          caloriesBurned: parseFloat(burnedCalories.toFixed(1)),
          lastUpdate: Date.now(),
          lastUpdated: Date.now()
        };
      });
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const addGoodRep = () => {
    setStats(prev => updateStatsForGoodRep(prev));
  };
  
  const addBadRep = () => {
    setStats(prev => updateStatsForBadRep(prev));
  };
  
  const resetStats = () => {
    setStats(getInitialStats());
  };
  
  return {
    stats,
    addGoodRep,
    addBadRep,
    resetStats
  };
};
