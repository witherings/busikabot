import { motion } from "framer-motion";
import { AnniversaryCounter } from "@/components/AnniversaryCounter";
import { DailyMessage } from "@/components/DailyMessage";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col relative overflow-hidden selection:bg-primary/20 fixed inset-0 touch-none">
      
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-between py-8 relative z-10 px-4 max-w-md mx-auto w-full overflow-hidden">
        
        {/* Header / Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center space-y-6 w-full"
        >
          {/* Photo Frame */}
          <div className="relative cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-primary/0 rounded-full blur opacity-40"></div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-black/40">
              <img 
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2787&auto=format&fit=crop" 
                alt="Us" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute bottom-0 right-2 p-1.5 bg-background rounded-full border border-white/5 shadow-lg">
               <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
              Мы с бусинкой вместе уже
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-light tracking-widest uppercase">
              С 31 декабря 2024
            </p>
          </div>
        </motion.div>

        {/* Counters */}
        <div className="w-full flex-1 flex items-center">
          <AnniversaryCounter />
        </div>

        {/* Daily Card */}
        <div className="w-full">
          <DailyMessage />
        </div>

        <footer className="mt-4 text-center text-[8px] text-muted-foreground/30 font-mono tracking-widest uppercase">
          С любовью
        </footer>
      </main>
    </div>
  );
}
