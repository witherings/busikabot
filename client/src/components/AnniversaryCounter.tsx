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

function TimeBlock({ value, label, delay = 0 }: TimeBlockProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="flex flex-col items-center p-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm flex-1 min-w-0"
    >
      <span className="text-xl sm:text-2xl font-mono font-light tracking-tighter text-foreground tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[8px] uppercase tracking-widest text-muted-foreground mt-0.5">
        {label}
      </span>
    </motion.div>
  );
}

export function AnniversaryCounter() {
  const [now, setNow] = useState(new Date());
  const [daysTogether, setDaysTogether] = useState(0);
  const [duration, setDuration] = useState<Duration>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setNow(currentDate);
      
      setDaysTogether(differenceInDays(currentDate, START_DATE));
      setDuration(intervalToDuration({ start: START_DATE, end: currentDate }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full text-center space-y-4">
      <div className="space-y-1">
        <h3 className="text-[10px] sm:text-xs text-primary/60 uppercase tracking-[0.2em] font-medium">
          Всего дней вместе
        </h3>
        <div className="text-7xl sm:text-8xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 leading-none select-none">
          {daysTogether}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-2 max-w-sm mx-auto">
        <TimeBlock value={duration.years || 0} label="Лет" delay={0.1} />
        <TimeBlock value={duration.months || 0} label="Месяцев" delay={0.2} />
        <TimeBlock value={duration.days || 0} label="Дней" delay={0.3} />
        <TimeBlock value={duration.hours || 0} label="Часов" delay={0.4} />
        <TimeBlock value={duration.minutes || 0} label="Минут" delay={0.5} />
        <TimeBlock value={duration.seconds || 0} label="Секунд" delay={0.6} />
      </div>
    </div>
  );
}
