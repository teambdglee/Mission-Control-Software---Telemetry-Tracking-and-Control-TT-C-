
import { useState, useEffect } from 'react';
import { MISSION_EPOCH } from '../constants';

const getMoonTime = () => {
  // Simplified Moon time for demonstration. 1 Earth day ≈ 1.027 Lunar days (sols).
  // This is a rough approximation.
  const now = new Date();
  const earthSecondsSinceEpoch = (now.getTime() - MISSION_EPOCH) / 1000;
  const lunarSecondsSinceEpoch = earthSecondsSinceEpoch / 29.53; // Simplification
  
  const days = Math.floor(lunarSecondsSinceEpoch / 86400);
  const remSeconds = lunarSecondsSinceEpoch % 86400;
  const hours = Math.floor(remSeconds / 3600);
  const minutes = Math.floor((remSeconds % 3600) / 60);
  const seconds = Math.floor(remSeconds % 60);
  
  return `MET ${String(days).padStart(3, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const useClocks = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  return {
    utc: time.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'UTC' }),
    bangladesh: time.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'Asia/Dhaka' }),
    usa: time.toLocaleTimeString('en-US', { ...timeOptions, timeZone: 'America/Chicago' }), // Houston (CST/CDT)
    moon: getMoonTime(),
  };
};
