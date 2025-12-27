import { motion } from "framer-motion";
import { AnniversaryCounter } from "@/components/AnniversaryCounter";
import { DailyMessage } from "@/components/DailyMessage";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden selection:bg-primary/20">
      
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center py-12 sm:py-20 relative z-10 px-4">
        
        {/* Header / Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center space-y-8 mb-16"
        >
          {/* Photo Frame */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-primary/0 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-black/40">
              {/* 
                USER: Replace this URL with your actual photo. 
                Upload it to client/public/us.jpg and use src="/us.jpg"
              */}
              <img 
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2787&auto=format&fit=crop" 
                alt="Us" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
              />
            </div>
            <div className="absolute bottom-0 right-4 p-2 bg-background rounded-full border border-white/5 shadow-lg">
               <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide">
              Мы с бусинкой вместе уже
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-light tracking-widest uppercase">
              Since December 28, 2024
            </p>
          </div>
        </motion.div>

        {/* Counters */}
        <AnniversaryCounter />

        {/* Daily Card */}
        <DailyMessage />

      </main>

      <footer className="py-8 text-center text-xs text-muted-foreground/30 relative z-10 font-mono tracking-widest uppercase">
        Designed with Love
      </footer>
    </div>
  );
}
