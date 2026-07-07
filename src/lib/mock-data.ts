import { EventDetail, EventSummary, Registration } from "@/types/event";

// In-memory store — resets whenever the dev server restarts. Good enough
// for exercising the organizer flow before the real backend exists.
export const mockEvents: EventDetail[] = [
  {
    id: "evt_1",
    name: "TechConnect Summit 2026",
    description:
      "A full-day conference bringing together developers, designers, and founders to talk about the future of building software.",
    venue: "Expo Center, Karachi",
    startsAt: "2026-09-12T09:00:00.000Z",
    endsAt: "2026-09-12T18:00:00.000Z",
    ticketPrice: 2500,
    currency: "PKR",
    capacity: 500,
    registeredCount: 312,
    coverImageUrl: null,
    status: "published",
    organizerId: "org_1",
    organizerName: "TechConnect",
  },
  {
    id: "evt_2",
    name: "Startup Founders Meetup",
    description:
      "Casual networking evening for early-stage founders, investors, and operators.",
    venue: "The Hub, Lahore",
    startsAt: "2026-08-02T17:00:00.000Z",
    endsAt: "2026-08-02T20:00:00.000Z",
    ticketPrice: 0,
    currency: "PKR",
    capacity: 120,
    registeredCount: 98,
    coverImageUrl: null,
    status: "published",
    organizerId: "org_1",
    organizerName: "TechConnect",
  },
  {
    id: "evt_3",
    name: "AI in Practice Workshop",
    description:
      "Hands-on workshop covering practical LLM application patterns for product teams.",
    venue: "Online",
    startsAt: "2026-07-20T13:00:00.000Z",
    endsAt: "2026-07-20T16:00:00.000Z",
    ticketPrice: 1500,
    currency: "PKR",
    capacity: 200,
    registeredCount: 187,
    coverImageUrl: null,
    status: "published",
    organizerId: "org_1",
    organizerName: "TechConnect",
  },
];

export const mockRegistrations: Registration[] = [
  {
    id: "reg_1",
    eventId: "evt_1",
    userId: "mock_user_1",
    attendeeName: "Ayesha Khan",
    attendeeEmail: "ayesha@example.com",
    status: "confirmed",
    createdAt: "2026-06-01T10:00:00.000Z",
    qrToken: "mock-qr-reg_1",
  },
  {
    id: "reg_2",
    eventId: "evt_1",
    userId: "mock_user_2",
    attendeeName: "Bilal Ahmed",
    attendeeEmail: "bilal@example.com",
    status: "checked_in",
    createdAt: "2026-06-02T11:30:00.000Z",
    qrToken: "mock-qr-reg_2",
  },
  {
    id: "reg_3",
    eventId: "evt_1",
    userId: "mock_user_3",
    attendeeName: "Sara Malik",
    attendeeEmail: "sara@example.com",
    status: "pending_payment",
    createdAt: "2026-06-03T09:15:00.000Z",
    qrToken: null,
  },
  {
    id: "reg_4",
    eventId: "evt_2",
    userId: "mock_user_4",
    attendeeName: "Hamza Tariq",
    attendeeEmail: "hamza@example.com",
    status: "confirmed",
    createdAt: "2026-06-05T14:00:00.000Z",
    qrToken: "mock-qr-reg_4",
  },
];

export function toSummary(event: EventDetail): EventSummary {
  const { organizerId, organizerName, ...summary } = event;
  void organizerId;
  void organizerName;
  return summary;
}
