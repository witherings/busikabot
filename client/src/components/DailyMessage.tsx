import { motion } from "framer-motion";
import { useTodayMessage } from "@/hooks/use-messages";

export function DailyMessage() {
  const { data: message, isLoading } = useTodayMessage();

  if (isLoading) {
    return (
      <div className="w-full h-24 animate-pulse bg-white/5 rounded-2xl" />
    );
  }

  // Fallback if no message exists for today yet
  const displayContent = message?.content || "Каждый день с тобой — это подарок.";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full p-5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <p className="text-base sm:text-lg font-normal italic leading-relaxed text-white/90 text-center relative z-10">
          "{displayContent}"
        </p>
      </motion.div>
    </motion.div>
  );
}
