import { motion } from "framer-motion";
import { AnniversaryCounter } from "@/components/AnniversaryCounter";
import { DailyMessage } from "@/components/DailyMessage";
import { useState, useEffect, useMemo } from "react";
import { differenceInDays } from "date-fns";

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
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#050b1a] via-[#0a1428] to-[#050b1a] text-foreground flex flex-col relative overflow-hidden fixed inset-0 touch-none font-sans">
      
      {/* Animated Stars */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none z-[15]"
      >
        {stars.map(star => (
          <Star key={star.id} style={star} />
        ))}
      </motion.div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 max-w-md mx-auto w-full overflow-y-auto">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-transparent rounded-3xl p-6 flex flex-col items-center relative overflow-hidden z-20"
        >
          {/* Transparent card with border and shadow */}
          <div className="absolute inset-0 bg-white/[0.01] pointer-events-none rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.4)] z-[-1]"></div>
          
          {/* 1. Photo Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative mb-3"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-[6px] border-white/5 shadow-2xl">
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
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center space-y-2 mb-4"
          >
            <h1 className="text-xl sm:text-2xl font-normal text-white/80 tracking-wide">
              Мы с бусинкой вместе:
            </h1>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-[#f2c94c] tracking-tight">
                {daysTogether}
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-[#f2c94c] tracking-tight">
                дней
              </span>
            </div>
          </motion.div>

          {/* 3. Detailed Counter */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full mb-3"
          >
            <AnniversaryCounter />
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="w-full h-[1px] bg-white/5 mb-3 origin-center" 
          />

          {/* 4. Daily Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full"
          >
            <DailyMessage />
          </motion.div>
        </motion.div>

      </main>
    </div>
  );
}
