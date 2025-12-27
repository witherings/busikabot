import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTodayMessage } from "@/hooks/use-messages";
import { format } from "date-fns";

export function DailyMessage() {
  const { data: message, isLoading } = useTodayMessage();

  if (isLoading) {
    return (
      <div className="w-full h-32 animate-pulse bg-white/5 rounded-2xl max-w-2xl mx-auto" />
    );
  }

  // Fallback if no message exists for today yet
  const displayContent = message?.content || "Каждый день с тобой — это подарок.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-sm mx-auto mt-4 px-4"
    >
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Quote className="w-12 h-12 text-primary" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
              Сообщение дня
            </span>
          </div>

          <p className="text-lg font-serif italic leading-relaxed text-white/90">
            "{displayContent}"
          </p>

          <div className="w-8 h-[1px] bg-primary/20" />
        </div>
      </div>
    </motion.div>
  );
}
