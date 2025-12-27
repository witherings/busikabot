import { useState, useEffect } from "react";
import { intervalToDuration } from "date-fns";

type Duration = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

const START_DATE = new Date(2024, 11, 31);

interface TimeBlockProps {
  value: number;
  label: string;
}

function TimeBlock({ value, label }: TimeBlockProps) {
  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-2xl font-light text-white tabular-nums leading-none mb-1">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-light">
        {label}
      </span>
    </div>
  );
}

export function AnniversaryCounter() {
  const [duration, setDuration] = useState<Duration>(() => 
    intervalToDuration({ start: START_DATE, end: new Date() })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(intervalToDuration({ start: START_DATE, end: new Date() }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full space-y-6 glass-card p-6 rounded-[2rem]">
      <div className="flex justify-between w-full">
        <TimeBlock value={duration.years || 0} label="года" />
        <TimeBlock value={duration.months || 0} label="мес" />
        <TimeBlock value={duration.days || 0} label="дней" />
      </div>
      <div className="h-px bg-white/[0.05] w-full" />
      <div className="flex justify-between w-full">
        <TimeBlock value={duration.hours || 0} label="час" />
        <TimeBlock value={duration.minutes || 0} label="мин" />
        <TimeBlock value={duration.seconds || 0} label="сек" />
      </div>
    </div>
  );
}
