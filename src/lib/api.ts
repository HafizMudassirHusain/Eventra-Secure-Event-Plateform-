import {
  EventDetail,
  EventInput,
  EventStatus,
  EventSummary,
  Registration,
  RegistrationWithEvent,
} from "@/types/event";
import { mockEvents, mockRegistrations, toSummary } from "@/lib/mock-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Backend isn't built yet, so these resolve against mock data.
// Swap the body for a `fetch(`${API_URL}/...`)` call once the NestJS API exists —
// the function signatures are the contract the UI already depends on.
function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function listEvents(): Promise<EventSummary[]> {
  return delay(mockEvents.map(toSummary));
}

export async function getEvent(id: string): Promise<EventDetail | null> {
  const event = mockEvents.find((e) => e.id === id) ?? null;
  return delay(event);
}

export async function registerForEvent(
  eventId: string,
  payload: { fullName: string; email: string; userId: string }
): Promise<{ registrationId: string }> {
  const event = mockEvents.find((e) => e.id === eventId);
  if (!event) throw new Error("Event not found");
  if (event.status === "cancelled") throw new Error("Event is cancelled");

  const registration: Registration = {
    id: `reg_${Math.random().toString(36).slice(2, 10)}`,
    eventId,
    userId: payload.userId,
    attendeeName: payload.fullName,
    attendeeEmail: payload.email,
    status: event.ticketPrice === 0 ? "confirmed" : "pending_payment",
    createdAt: new Date().toISOString(),
    qrToken: event.ticketPrice === 0 ? `mock-qr-${Math.random().toString(36).slice(2, 10)}` : null,
  };
  mockRegistrations.push(registration);
  event.registeredCount += 1;

  return delay({ registrationId: registration.id });
}

export async function payForRegistration(
  registrationId: string
): Promise<Registration> {
  const registration = mockRegistrations.find((r) => r.id === registrationId);
  if (!registration) throw new Error("Registration not found");

  registration.status = "confirmed";
  registration.qrToken = `mock-qr-${Math.random().toString(36).slice(2, 10)}`;

  return delay(registration);
}

export async function listMyRegistrations(
  userId: string
): Promise<RegistrationWithEvent[]> {
  const registrations = mockRegistrations
    .filter((r) => r.userId === userId)
    .map((r) => {
      const event = mockEvents.find((e) => e.id === r.eventId);
      return event ? { ...r, event: toSummary(event) } : null;
    })
    .filter((r): r is RegistrationWithEvent => r !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return delay(registrations);
}

export async function getRegistration(
  registrationId: string
): Promise<RegistrationWithEvent | null> {
  const registration = mockRegistrations.find((r) => r.id === registrationId);
  if (!registration) return delay(null);
  const event = mockEvents.find((e) => e.id === registration.eventId);
  if (!event) return delay(null);
  return delay({ ...registration, event: toSummary(event) });
}

export async function cancelRegistration(registrationId: string): Promise<void> {
  const registration = mockRegistrations.find((r) => r.id === registrationId);
  if (registration) {
    registration.status = "cancelled";
    const event = mockEvents.find((e) => e.id === registration.eventId);
    if (event) event.registeredCount = Math.max(0, event.registeredCount - 1);
  }
  return delay(undefined);
}

// --- Organizer ---

export async function listOrganizerEvents(): Promise<EventSummary[]> {
  return delay(mockEvents.map(toSummary));
}

export async function createEvent(input: EventInput): Promise<EventDetail> {
  const event: EventDetail = {
    ...input,
    id: `evt_${Math.random().toString(36).slice(2, 10)}`,
    registeredCount: 0,
    coverImageUrl: null,
    status: "published",
    organizerId: "org_1",
    organizerName: "You",
  };
  mockEvents.unshift(event);
  return delay(event);
}

export async function updateEvent(
  id: string,
  input: EventInput
): Promise<EventDetail> {
  const index = mockEvents.findIndex((e) => e.id === id);
  if (index === -1) throw new Error("Event not found");
  mockEvents[index] = { ...mockEvents[index], ...input };
  return delay(mockEvents[index]);
}

export async function deleteEvent(id: string): Promise<void> {
  const index = mockEvents.findIndex((e) => e.id === id);
  if (index !== -1) mockEvents.splice(index, 1);
  return delay(undefined);
}

export async function listRegistrations(eventId: string): Promise<Registration[]> {
  return delay(mockRegistrations.filter((r) => r.eventId === eventId));
}

export async function checkInRegistration(registrationId: string): Promise<Registration> {
  const registration = mockRegistrations.find((r) => r.id === registrationId);
  if (!registration) throw new Error("Registration not found");
  registration.status = "checked_in";
  return delay(registration);
}

export async function updateEventStatus(
  id: string,
  status: EventStatus
): Promise<EventDetail> {
  const event = mockEvents.find((e) => e.id === id);
  if (!event) throw new Error("Event not found");
  event.status = status;
  return delay(event);
}

export function exportRegistrationsCsv(
  event: EventSummary,
  registrations: Registration[]
) {
  const header = ["Name", "Email", "Status", "Registered at"];
  const rows = registrations.map((r) => [
    r.attendeeName,
    r.attendeeEmail,
    r.status,
    r.createdAt,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-attendees.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function apiUrl(path: string) {
  return `${API_URL}${path}`;
}
