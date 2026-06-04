import { useState, useEffect } from 'react';

interface TimeData {
  hours: string;
  minutes: string;
  seconds: string;
  full: string;
  date: string;
  timezone: string;
}

export function useTime(): TimeData {
  const [time, setTime] = useState<TimeData>(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function getTime(): TimeData {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return {
    hours,
    minutes,
    seconds,
    full: `${hours}:${minutes}:${seconds}`,
    date,
    timezone,
  };
}
