import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelRegistration,
  getRegistration,
  listMyRegistrations,
  payForRegistration,
} from "@/lib/api";

export function useMyRegistrations(userId: string | undefined) {
  return useQuery({
    queryKey: ["my-registrations", userId],
    queryFn: () => listMyRegistrations(userId as string),
    enabled: Boolean(userId),
  });
}

export function useRegistration(registrationId: string) {
  return useQuery({
    queryKey: ["registrations", registrationId],
    queryFn: () => getRegistration(registrationId),
    enabled: Boolean(registrationId),
  });
}

export function usePayForRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => payForRegistration(registrationId),
    onSuccess: (registration) => {
      queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
      queryClient.invalidateQueries({ queryKey: ["registrations", registration.id] });
    },
  });
}

export function useCancelRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => cancelRegistration(registrationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
