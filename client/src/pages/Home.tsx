import { motion } from "framer-motion";
import { AnniversaryCounter } from "@/components/AnniversaryCounter";
import { DailyMessage } from "@/components/DailyMessage";
import { useState, useEffect, useMemo } from "react";
import { differenceInDays, intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { useSendTelegram } from "@/hooks/use-telegram";
import { getRandomMessage } from "@/data/messages";

import coupleImg from "@/assets/couple.png";

const START_DATE = new Date(2024, 11, 31);

const Star = ({ style }: { style: any }) => (
  <motion.div
    className="absolute rounded-full"
    initial={{ opacity: 0.2, scale: 0.8 }}
    animate={{ 
      opacity: [0.2, 0.8, 0.2],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 3 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 5
    }}
    style={style}
  />
);

export default function Home() {
  const [daysTogether, setDaysTogether] = useState(() => 
    differenceInDays(new Date(), START_DATE)
  );
  const [duration, setDuration] = useState(() =>
    intervalToDuration({ start: START_DATE, end: new Date() })
  );
  const { mutate: sendTelegram, isPending } = useSendTelegram();

  const handleSendToTelegram = () => {
    const timeText = `${String(duration.years || 0).padStart(2, "0")} лет, ${String(duration.months || 0).padStart(2, "0")} месяцев, ${String(duration.days || 0).padStart(2, "0")} дней, ${String(duration.hours || 0).padStart(2, "0")} часов, ${String(duration.minutes || 0).padStart(2, "0")} минут, ${String(duration.seconds || 0).padStart(2, "0")} секунд`;
    const randomMessage = getRandomMessage();

    sendTelegram({
      time: timeText,
      message: randomMessage,
    });
  };

  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const colors = [
        'rgba(255, 255, 255, 0.8)', // White
        'rgba(255, 245, 150, 0.8)', // Yellowish
        'rgba(180, 220, 255, 0.8)', // Bluish
      ];
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        boxShadow: `0 0 ${2 + Math.random() * 4}px ${colors[Math.floor(Math.random() * colors.length)]}`
      };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysTogether(differenceInDays(new Date(), START_DATE));
      setDuration(intervalToDuration({ start: START_DATE, end: new Date() }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[100dvh] w-screen bg-[#050b1a] text-foreground flex flex-col relative overflow-hidden font-sans">
      
      {/* Animated Stars */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {stars.map(star => (
          <Star key={star.id} style={star} />
        ))}
      </motion.div>

      <main className="h-full flex flex-col items-center justify-between px-6 py-8 relative z-10 w-full max-w-lg mx-auto overflow-hidden">
        
        {/* 1. Photo Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative flex-shrink-0"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <img 
              src={coupleImg} 
              alt="Us" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* 2. Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center w-full"
        >
          <h1 className="text-xl font-light text-white/70 tracking-widest mb-2 uppercase">
            Мы вместе:
          </h1>
          <div className="flex items-center justify-center gap-4">
            <span className="text-7xl font-light text-primary gold-glow leading-none">
              {daysTogether}
            </span>
            <span className="text-2xl font-light text-primary/80 tracking-tight self-end pb-1">
              дней
            </span>
          </div>
        </motion.div>

        {/* 3. Detailed Counter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full flex-shrink-0"
        >
          <AnniversaryCounter />
        </motion.div>

        {/* 4. Daily Message */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full flex-shrink-0"
        >
          <DailyMessage />
        </motion.div>

        {/* 5. ЖМЯК Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full flex-shrink-0"
        >
          <Button
            onClick={handleSendToTelegram}
            disabled={isPending}
            variant="outline"
            className="w-full glass-card hover-elevate active-elevate-2 text-primary border-primary/30 text-lg font-light tracking-widest h-14 rounded-full transition-all duration-300 hover:border-primary/60 hover:bg-primary/5"
            data-testid="button-send-telegram"
          >
            {isPending ? "Отправляю..." : "ЖМЯК"}
          </Button>
        </motion.div>

      </main>
    </div>
  );
}
