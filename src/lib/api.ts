import {
  EventDetail,
  EventInput,
  EventStatus,
  EventSummary,
  Registration,
  RegistrationWithEvent,
} from "@/types/event";
import { Role } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function apiUrl(path: string) {
  return `${API_URL}${path}`;
}

async function request<T>(
  path: string,
  options: { method?: string; token?: string; body?: unknown } = {}
): Promise<T> {
  const res = await fetch(apiUrl(path), {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export function becomeOrganizer(
  token: string
): Promise<{ accessToken: string; user: { id: string; email: string; name: string; role: Role } }> {
  return request("/auth/become-organizer", { method: "POST", token });
}

// --- Events (attendee-facing) ---

export function listEvents(): Promise<EventSummary[]> {
  return request("/events");
}

export function getEvent(id: string): Promise<EventDetail> {
  return request(`/events/${id}`);
}

export function registerForEvent(
  eventId: string,
  payload: { fullName: string; email: string },
  token: string
): Promise<{ registrationId: string }> {
  return request<Registration>(`/events/${eventId}/registrations`, {
    method: "POST",
    token,
    body: { attendeeName: payload.fullName, attendeeEmail: payload.email },
  }).then((registration) => ({ registrationId: registration.id }));
}

export function payForRegistration(
  registrationId: string,
  token: string
): Promise<Registration> {
  return request(`/registrations/${registrationId}/pay`, { method: "POST", token });
}

export function createCheckoutSession(
  registrationId: string,
  token: string
): Promise<{ url: string }> {
  return request(`/registrations/${registrationId}/checkout`, { method: "POST", token });
}

export function listMyRegistrations(token: string): Promise<RegistrationWithEvent[]> {
  return request("/registrations/me", { token });
}

export function getRegistration(
  registrationId: string,
  token: string
): Promise<RegistrationWithEvent | null> {
  return request<RegistrationWithEvent>(`/registrations/${registrationId}`, { token }).catch(
    () => null
  );
}

export function cancelRegistration(registrationId: string, token: string): Promise<void> {
  return request(`/registrations/${registrationId}`, { method: "DELETE", token });
}

// --- Organizer ---

export function listOrganizerEvents(token: string): Promise<EventSummary[]> {
  return request("/events/mine", { token });
}

export function createEvent(input: EventInput, token: string): Promise<EventDetail> {
  return request("/events", { method: "POST", token, body: input });
}

export function updateEvent(
  id: string,
  input: EventInput,
  token: string
): Promise<EventDetail> {
  return request(`/events/${id}`, { method: "PATCH", token, body: input });
}

export function updateEventStatus(
  id: string,
  status: EventStatus,
  token: string
): Promise<EventDetail> {
  return request(`/events/${id}/status`, {
    method: "PATCH",
    token,
    body: { status: status.toUpperCase() },
  });
}

export function deleteEvent(id: string, token: string): Promise<void> {
  return request(`/events/${id}`, { method: "DELETE", token });
}

export function listRegistrations(eventId: string, token: string): Promise<Registration[]> {
  return request(`/events/${eventId}/registrations`, { token });
}

export function checkInRegistration(
  registrationId: string,
  token: string
): Promise<Registration> {
  return request(`/registrations/${registrationId}/check-in`, { method: "PATCH", token });
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
