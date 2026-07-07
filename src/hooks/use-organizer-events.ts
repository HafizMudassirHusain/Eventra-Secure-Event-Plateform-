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

export function useOrganizerEvents() {
  return useQuery({
    queryKey: ["organizer", "events"],
    queryFn: listOrganizerEvents,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EventInput) => createEvent(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EventInput) => updateEvent(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });
}

export function useUpdateEventStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: EventStatus) => updateEventStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useRegistrations(eventId: string) {
  return useQuery({
    queryKey: ["organizer", "events", eventId, "registrations"],
    queryFn: () => listRegistrations(eventId),
    enabled: Boolean(eventId),
  });
}

export function useCheckInRegistration(eventId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => checkInRegistration(registrationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizer", "events", eventId, "registrations"],
      });
    },
  });
}

export function useCancelRegistrationAsOrganizer(eventId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registrationId: string) => cancelRegistration(registrationId),
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
