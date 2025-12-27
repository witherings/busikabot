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
    <div className="w-full max-w-sm mx-auto px-4">
      <p className="text-xl sm:text-2xl font-serif italic font-light leading-relaxed text-white/90 text-center">
        "{displayContent}"
      </p>
    </div>
  );
}
