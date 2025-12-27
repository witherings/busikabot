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
      <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums leading-none mb-2">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[11px] uppercase tracking-[0.1em] text-white/40 font-medium">
        {label}
      </span>
    </div>
  );
}

export function AnniversaryCounter() {
  const [duration, setDuration] = useState<Duration>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setDuration(intervalToDuration({ start: START_DATE, end: currentDate }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between w-full max-w-[280px] mx-auto gap-4">
        <TimeBlock value={duration.years || 0} label="года" />
        <TimeBlock value={duration.months || 0} label="месяцев" />
        <TimeBlock value={duration.days || 0} label="дней" />
      </div>
      <div className="flex justify-between w-full max-w-[280px] mx-auto gap-4">
        <TimeBlock value={duration.hours || 0} label="час" />
        <TimeBlock value={duration.minutes || 0} label="минут" />
        <TimeBlock value={duration.seconds || 0} label="секунды" />
      </div>
    </div>
  );
}
