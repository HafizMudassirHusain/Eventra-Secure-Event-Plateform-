import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvent, listEvents, registerForEvent } from "@/lib/api";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: listEvents,
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id),
    enabled: Boolean(id),
  });
}

export function useRegisterForEvent(eventId: string, token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { fullName: string; email: string }) =>
      registerForEvent(eventId, payload, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
    },
  });
}
