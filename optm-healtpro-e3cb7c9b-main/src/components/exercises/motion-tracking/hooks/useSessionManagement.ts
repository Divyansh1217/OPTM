
import { useState, useCallback, useEffect } from 'react';
import * as Human from '@vladmandic/human';
import { MotionState, MotionStats } from '@/lib/human/types';
import { getInitialStats, updateStatsForGoodRep, updateStatsForBadRep, toMotionStats, SessionStats } from './useSessionStats';

interface UseSessionManagementProps {
  sessionId?: string;
  onSessionComplete?: (sessionData: any) => void;
}

export const useSessionManagement = ({ sessionId, onSessionComplete }: UseSessionManagementProps) => {
  // Use SessionStats type internally but expose as MotionStats to match the interface
  const [stats, setStats] = useState<MotionStats>(() => {
    const initialStats = getInitialStats();
    return toMotionStats(initialStats);
  });

  const [sessionData, setSessionData] = useState<any[]>([]);
  
  // Add a rep with good form
  const addGoodRep = useCallback(() => {
    setStats(prev => {
      // Convert MotionStats to SessionStats, update it, then convert back
      const sessionStats: SessionStats = {
        ...prev,
        startTime: prev.lastUpdated,
        lastUpdate: prev.lastUpdated
      };
      const updatedSessionStats = updateStatsForGoodRep(sessionStats);
      return toMotionStats(updatedSessionStats);
    });
  }, []);
  
  // Add a rep with bad form
  const addBadRep = useCallback(() => {
    setStats(prev => {
      // Convert MotionStats to SessionStats, update it, then convert back
      const sessionStats: SessionStats = {
        ...prev,
        startTime: prev.lastUpdated,
        lastUpdate: prev.lastUpdated
      };
      const updatedSessionStats = updateStatsForBadRep(sessionStats);
      return toMotionStats(updatedSessionStats);
    });
  }, []);
  
  // Reset the session stats
  const resetSession = useCallback(() => {
    const initialStats = getInitialStats();
    setStats(toMotionStats(initialStats));
    setSessionData([]);
  }, []);
  
  // Save session data for a rep
  const saveRepData = useCallback((
    result: Human.Result,
    angles: any,
    biomarkers: Record<string, number | null>,
    motionState: MotionState,
    isGoodForm: boolean
  ) => {
    const timestamp = Date.now();
    
    const repData = {
      timestamp,
      sessionId,
      motionState,
      angles,
      biomarkers,
      isGoodForm,
      stats: { ...stats }
    };
    
    setSessionData(prev => [...prev, repData]);
    
    return repData;
  }, [sessionId, stats]);
  
  // Complete the session and process data
  const completeSession = useCallback(async () => {
    if (!sessionId) return;
    
    try {
      // Prepare session summary
      const sessionSummary = {
        sessionId,
        completedAt: Date.now(),
        stats,
        data: sessionData
      };
      
      // Call the provided callback with session data
      if (onSessionComplete) {
        onSessionComplete(sessionSummary);
      }
      
      return sessionSummary;
    } catch (error) {
      console.error('Error completing session:', error);
      return null;
    }
  }, [sessionId, stats, sessionData, onSessionComplete]);
  
  return {
    stats,
    sessionData,
    addGoodRep,
    addBadRep,
    resetSession,
    saveRepData,
    completeSession
  };
};
