import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { motion } from "framer-motion";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Simple admin page to add messages for future dates
export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      content: "",
      displayDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      const res = await fetch(api.messages.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create message");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Message scheduled successfully." });
      form.reset();
      // Advance date by 1 day automatically for convenience
      const currentDate = new Date(form.getValues("displayDate"));
      currentDate.setDate(currentDate.getDate() + 1);
      form.setValue("displayDate", format(currentDate, "yyyy-MM-dd"));
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
    onSettled: () => setIsPending(false),
  });

  const onSubmit = (data: InsertMessage) => {
    setIsPending(true);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-white/5 rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="text-2xl font-serif mb-6 text-center">Schedule Messages</h1>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Date (YYYY-MM-DD)</label>
            <div className="relative">
              <input
                type="date"
                {...form.register("displayDate")}
                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <CalendarIcon className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {form.formState.errors.displayDate && (
              <p className="text-xs text-destructive">{form.formState.errors.displayDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Message</label>
            <textarea
              {...form.register("content")}
              rows={4}
              placeholder="Write something sweet..."
              className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            {form.formState.errors.content && (
              <p className="text-xs text-destructive">{form.formState.errors.content.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Scheduling..." : "Schedule Message"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
