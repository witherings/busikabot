import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTodayMessage } from "@/hooks/use-messages";
import { useSendTelegram } from "@/hooks/use-telegram";
import { intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MESSAGES, getRandomMessage } from "@/data/messages";

const START_DATE = new Date(2024, 11, 31);

export function DailyMessage() {
  const { data: message, isLoading } = useTodayMessage();
  const { mutate: sendTelegram, isPending } = useSendTelegram();
  const [duration, setDuration] = useState(() =>
    intervalToDuration({ start: START_DATE, end: new Date() })
  );

  const handleSendToTelegram = () => {
    const timeText = `${String(duration.years || 0).padStart(2, "0")} лет, ${String(duration.months || 0).padStart(2, "0")} месяцев, ${String(duration.days || 0).padStart(2, "0")} дней, ${String(duration.hours || 0).padStart(2, "0")} часов, ${String(duration.minutes || 0).padStart(2, "0")} минут, ${String(duration.seconds || 0).padStart(2, "0")} секунд`;
    const randomMessage = getRandomMessage();

    sendTelegram({
      time: timeText,
      message: randomMessage,
    });
  };

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
      className="w-full max-w-sm mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="space-y-3"
      >
        <p className="text-sm sm:text-base font-normal italic leading-snug text-white/90 text-center relative z-10">
          "{displayContent}"
        </p>

        <div className="pt-2 border-t border-white/10">
          <Button
            onClick={handleSendToTelegram}
            disabled={isPending}
            variant="outline"
            size="sm"
            className="w-full text-white/80 text-xs sm:text-sm"
            data-testid="button-send-telegram"
          >
            {isPending ? "Отправляю..." : "Жмякни меня"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
