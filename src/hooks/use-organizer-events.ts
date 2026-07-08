import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelRegistration,
  checkInRegistration,
  createEvent,
  deleteEvent,
  listOrganizerEvents,
  listRegistrations,
  updateEvent,
  updateEventStatus,
} from "@/lib/api";
import { EventInput, EventStatus } from "@/types/event";

export function useOrganizerEvents(token: string | undefined) {
  return useQuery({
    queryKey: ["organizer", "events", token],
    queryFn: () => listOrganizerEvents(token as string),
    enabled: Boolean(token),
  });
}

export function useCreateEvent(token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EventInput) => createEvent(input, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent(id: string, token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EventInput) => updateEvent(id, input, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });
}

export function useUpdateEventStatus(id: string, token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: EventStatus) => updateEventStatus(id, status, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });
}

export function useDeleteEvent(token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useRegistrations(eventId: string, token: string | undefined) {
  return useQuery({
    queryKey: ["organizer", "events", eventId, "registrations"],
    queryFn: () => listRegistrations(eventId, token as string),
    enabled: Boolean(eventId) && Boolean(token),
  });
}

export function useCheckInRegistration(eventId: string, token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => checkInRegistration(registrationId, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizer", "events", eventId, "registrations"],
      });
    },
  });
}

export function useCancelRegistrationAsOrganizer(eventId: string, token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => cancelRegistration(registrationId, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizer", "events", eventId, "registrations"],
      });
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
    },
  });
}
