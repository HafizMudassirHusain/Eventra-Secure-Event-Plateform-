export type EventStatus = "draft" | "published" | "cancelled" | "completed";

export interface EventSummary {
  id: string;
  name: string;
  description: string;
  venue: string;
  startsAt: string;
  endsAt: string;
  ticketPrice: number;
  currency: string;
  capacity: number;
  registeredCount: number;
  coverImageUrl: string | null;
  status: EventStatus;
}

export interface EventDetail extends EventSummary {
  organizerId: string;
  organizerName: string;
}

export type RegistrationStatus =
  | "pending_payment"
  | "confirmed"
  | "cancelled"
  | "checked_in";

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  attendeeName: string;
  attendeeEmail: string;
  status: RegistrationStatus;
  createdAt: string;
  qrToken: string | null;
}

export interface RegistrationWithEvent extends Registration {
  event: EventSummary;
}

export interface EventInput {
  name: string;
  description: string;
  venue: string;
  startsAt: string;
  endsAt: string;
  ticketPrice: number;
  currency: string;
  capacity: number;
}
