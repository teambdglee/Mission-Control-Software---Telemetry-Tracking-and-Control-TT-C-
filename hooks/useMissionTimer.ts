
import { useState, useEffect } from 'react';
import { MISSION_EPOCH } from '../constants';

export const useMissionTimer = () => {
  const [missionTime, setMissionTime] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const delta = now - MISSION_EPOCH;
      const prefix = delta >= 0 ? 'T+' : 'T-';
      const absDelta = Math.abs(delta);

      const days = Math.floor(absDelta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((absDelta % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((absDelta % (1000 * 60)) / 1000);

      const formattedTime = `${prefix} ${String(days).padStart(3, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setMissionTime(formattedTime);
    };

    const timerId = setInterval(updateTimer, 1000);
    updateTimer(); 

    return () => clearInterval(timerId);
  }, []);

  return missionTime;
};
