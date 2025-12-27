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
      className="w-full h-full backdrop-blur-md bg-white/[0.06] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(242,201,76,0.1)]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <p className="text-lg sm:text-xl font-light italic leading-relaxed text-white/80 text-center">
          "{displayContent}"
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8"
      >
        <Button
          onClick={handleSendToTelegram}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#f2c94c] to-[#ffb347] hover:from-[#ffd700] hover:to-[#ffc966] text-slate-900 font-bold text-lg h-16 rounded-full shadow-[0_0_20px_rgba(242,201,76,0.4)] hover:shadow-[0_0_30px_rgba(242,201,76,0.6)]"
          data-testid="button-send-telegram"
        >
          {isPending ? "Отправляю..." : "ЖМЯК"}
        </Button>
      </motion.div>
    </motion.div>
  );
}
