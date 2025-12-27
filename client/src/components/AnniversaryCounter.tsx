import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { intervalToDuration, differenceInDays } from "date-fns";

type Duration = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

// ДАТА НАЧАЛА: 31 декабря 2024 (чтобы 31 декабря 2025 был год)
const START_DATE = new Date(2024, 11, 31); // Месяц начинается с 0 (11 = Дек)

interface TimeBlockProps {
  value: number;
  label: string;
  delay?: number;
}

function TimeBlock({ value, label }: TimeBlockProps) {
  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <span className="text-xl sm:text-2xl font-semibold text-white/90 tabular-nums leading-none mb-0.5">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[8px] uppercase tracking-[0.1em] text-white/40 font-medium">
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
      const currentDate = new Date();
      setDuration(intervalToDuration({ start: START_DATE, end: currentDate }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full space-y-2 text-center">
      <div className="flex justify-center w-full gap-6 sm:gap-8">
        {(duration.years || 0) > 0 && <TimeBlock value={duration.years || 0} label="л" />}
        {(duration.months || 0) > 0 && <TimeBlock value={duration.months || 0} label="м" />}
        <TimeBlock value={duration.days || 0} label="д" />
      </div>
      <div className="flex justify-center w-full gap-6 sm:gap-8">
        <TimeBlock value={duration.hours || 0} label="ч" />
        <TimeBlock value={duration.minutes || 0} label="мин" />
        <TimeBlock value={duration.seconds || 0} label="с" />
      </div>
    </div>
  );
}
