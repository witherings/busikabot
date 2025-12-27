import { motion } from "framer-motion";
import { AnniversaryCounter } from "@/components/AnniversaryCounter";
import { DailyMessage } from "@/components/DailyMessage";
import { useState, useEffect, useMemo } from "react";
import { differenceInDays } from "date-fns";

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
  const [daysTogether, setDaysTogether] = useState(0);

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
      <div className="absolute inset-0 pointer-events-none">
        {stars.map(star => (
          <Star key={star.id} style={star} />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-md mx-auto w-full">
        
        <div className="w-full bg-black/20 backdrop-blur-md rounded-[3rem] p-10 sm:p-12 flex flex-col items-center shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10 relative overflow-hidden">
          {/* Subtle inner glow for the card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none"></div>
          
          {/* Photo Frame */}
          <div className="relative mb-10">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-[8px] border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2787&auto=format&fit=crop" 
                alt="Us" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          <div className="text-center space-y-4 mb-10">
            <h1 className="text-xl sm:text-2xl font-normal text-white/80 tracking-wide">
              Мы с бусинкой вместе уже
            </h1>
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-5xl sm:text-6xl font-bold text-[#f2c94c] tracking-tight">
                {daysTogether}
              </span>
              <span className="text-5xl sm:text-6xl font-bold text-[#f2c94c] tracking-tight">
                дней
              </span>
            </div>
          </div>

          {/* Counters */}
          <div className="w-full mb-12">
            <AnniversaryCounter />
          </div>

          <div className="w-full h-[1px] bg-white/5 mb-10" />

          {/* Daily Card */}
          <div className="w-full">
            <DailyMessage />
          </div>
        </div>

      </main>
    </div>
  );
}
