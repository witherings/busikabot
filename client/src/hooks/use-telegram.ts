import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSendTelegram() {
  return useMutation({
    mutationFn: async (data: { time: string; message: string }) => {
      const response = await fetch(api.messages.sendTelegram.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    },
  });
}
