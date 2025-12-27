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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-2xl mx-auto mt-16 px-6 sm:px-0"
    >
      <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Quote className="w-24 h-24 text-primary rotate-12" />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
              Message of the Day
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(), "MMMM do, yyyy")}
            </span>
          </div>

          <p className="text-xl sm:text-2xl font-serif italic leading-relaxed text-white/90">
            "{displayContent}"
          </p>

          <div className="w-12 h-[1px] bg-primary/30 mt-6" />
        </div>
      </div>
    </motion.div>
  );
}
