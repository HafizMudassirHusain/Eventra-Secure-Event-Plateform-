import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelRegistration,
  createCheckoutSession,
  getRegistration,
  listMyRegistrations,
  payForRegistration,
} from "@/lib/api";

export function useMyRegistrations(token: string | undefined) {
  return useQuery({
    queryKey: ["my-registrations", token],
    queryFn: () => listMyRegistrations(token as string),
    enabled: Boolean(token),
  });
}

export function useRegistration(
  registrationId: string,
  token: string | undefined,
  options: { poll?: boolean } = {}
) {
  return useQuery({
    queryKey: ["registrations", registrationId],
    queryFn: () => getRegistration(registrationId, token as string),
    enabled: Boolean(registrationId) && Boolean(token),
    refetchInterval: (query) => {
      if (!options.poll) return false;
      const status = query.state.data?.status;
      return status === "confirmed" || status === "checked_in" ? false : 1500;
    },
  });
}

export function usePayForRegistration(token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => payForRegistration(registrationId, token as string),
    onSuccess: (registration) => {
      queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
      queryClient.invalidateQueries({ queryKey: ["registrations", registration.id] });
    },
  });
}

export function useCreateCheckoutSession(token: string | undefined) {
  return useMutation({
    mutationFn: (registrationId: string) =>
      createCheckoutSession(registrationId, token as string),
  });
}

export function useCancelRegistration(token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => cancelRegistration(registrationId, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
