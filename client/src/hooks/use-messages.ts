import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type CreateMessageRequest } from "@shared/routes";

export function useTodayMessage() {
  return useQuery({
    queryKey: [api.messages.getToday.path],
    queryFn: async () => {
      // Pass timezone to ensure we get the correct "today" relative to user/Berlin
      const params = new URLSearchParams({ timezone: "Europe/Berlin" });
      const res = await fetch(`${api.messages.getToday.path}?${params}`, { 
        credentials: "include" 
      });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch message");
      
      return api.messages.getToday.responses[200].parse(await res.json());
    },
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMessageRequest) => {
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.messages.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create message");
      }
      
      return api.messages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.messages.getToday.path] });
    },
  });
}
