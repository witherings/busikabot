import { motion } from "framer-motion";
import { useTodayMessage } from "@/hooks/use-messages";

export function DailyMessage() {
  const { data: message, isLoading } = useTodayMessage();

  if (isLoading) {
    return (
      <div className="w-full h-24 animate-pulse bg-white/5 rounded-[2rem]" />
    );
  }

  const displayContent = message?.content || "Каждый день с тобой — это подарок.";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-10"
      >
        <p className="text-lg font-light italic leading-relaxed text-white/80 text-center font-serif">
          "{displayContent}"
        </p>
      </motion.div>
    </motion.div>
  );
}
