import { motion } from "framer-motion";
import { AnniversaryCounter } from "@/components/AnniversaryCounter";
import { DailyMessage } from "@/components/DailyMessage";
import { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";

const START_DATE = new Date(2024, 11, 31);

export default function Home() {
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysTogether(differenceInDays(new Date(), START_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#080c14] text-foreground flex flex-col relative overflow-hidden fixed inset-0 touch-none font-sans">
      
      {/* Subtle background star-like dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute top-1/3 left-2/3 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute top-2/3 left-3/4 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-white rounded-full"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-md mx-auto w-full">
        
        <div className="w-full bg-[#121826]/80 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center shadow-2xl border border-white/[0.03]">
          {/* Photo Frame */}
          <div className="relative mb-8">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-[6px] border-[#1a2235] shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2787&auto=format&fit=crop" 
                alt="Us" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <h1 className="text-lg sm:text-xl font-light text-white/90 tracking-wide">
              Мы с бусинкой вместе уже
            </h1>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-[#f2c94c]">
                {daysTogether}
              </span>
              <span className="text-4xl sm:text-5xl font-bold text-[#f2c94c]">
                дней
              </span>
            </div>
          </div>

          {/* Counters */}
          <div className="w-full mb-10">
            <AnniversaryCounter />
          </div>

          <div className="w-full h-[1px] bg-white/10 mb-8" />

          {/* Daily Card */}
          <div className="w-full">
            <DailyMessage />
          </div>
        </div>

      </main>
    </div>
  );
}
