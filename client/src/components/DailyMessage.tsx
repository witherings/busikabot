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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <p className="text-xl sm:text-2xl font-normal italic leading-relaxed text-white/90 text-center relative z-10">
          "{displayContent}"
        </p>
      </motion.div>
    </motion.div>
  );
}
