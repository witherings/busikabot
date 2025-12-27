import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { intervalToDuration, formatDuration, differenceInDays } from "date-fns";

// START DATE: December 28, 2024
const START_DATE = new Date(2024, 11, 28); // Month is 0-indexed (11 = Dec)

interface TimeBlockProps {
  value: number;
  label: string;
  delay?: number;
}

function TimeBlock({ value, label, delay = 0 }: TimeBlockProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm min-w-[70px] sm:min-w-[90px]"
    >
      <span className="text-2xl sm:text-3xl font-mono font-light tracking-tighter text-foreground">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
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
    <div className="w-full max-w-4xl mx-auto text-center space-y-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h3 className="text-lg sm:text-xl text-primary/80 uppercase tracking-[0.2em] font-medium">
          Total Days Together
        </h3>
        <div className="text-8xl sm:text-9xl md:text-[10rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 leading-none select-none">
          {daysTogether}
        </div>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 justify-center max-w-3xl mx-auto px-4">
        <TimeBlock value={duration.years || 0} label="Years" delay={0.1} />
        <TimeBlock value={duration.months || 0} label="Months" delay={0.2} />
        <TimeBlock value={duration.days || 0} label="Days" delay={0.3} />
        <TimeBlock value={duration.hours || 0} label="Hours" delay={0.4} />
        <TimeBlock value={duration.minutes || 0} label="Min" delay={0.5} />
        <TimeBlock value={duration.seconds || 0} label="Sec" delay={0.6} />
      </div>
    </div>
  );
}
