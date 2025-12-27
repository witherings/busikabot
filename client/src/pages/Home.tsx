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

      <main className="flex-1 flex flex-col items-center w-full px-4 relative z-10">
        
        {/* Photo with Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="pt-8 pb-4 flex-shrink-0"
        >
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(242,201,76,0.4)]">
            <img 
              src={coupleImg} 
              alt="Us" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Title - small and clean */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="pb-2 text-center flex-shrink-0"
        >
          <p className="text-sm sm:text-base text-white/60 font-normal tracking-wide">
            Мы вместе:
          </p>
        </motion.div>

        {/* Hero Days Count - MAIN FOCUS */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="py-4 flex-shrink-0 text-center"
        >
          <div className="text-7xl sm:text-8xl font-bold text-[#f2c94c] tracking-tight leading-none" style={{ textShadow: '0 0 20px rgba(242, 201, 76, 0.5)' }}>
            {daysTogether}
          </div>
          <p className="text-white/70 text-sm sm:text-base mt-2 font-light tracking-widest">ДНЕЙ</p>
        </motion.div>

        {/* Detailed Counter - Smaller, Lower Opacity */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="py-3 flex-shrink-0 opacity-60"
        >
          <AnniversaryCounter />
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-24 h-px bg-white/10 my-4 flex-shrink-0"
        />

        {/* Daily Message Card - Glassmorphism, Flexible */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full max-w-sm flex-1 flex flex-col px-4 pb-8"
        >
          <DailyMessage />
        </motion.div>

      </main>
    </div>
  );
}
