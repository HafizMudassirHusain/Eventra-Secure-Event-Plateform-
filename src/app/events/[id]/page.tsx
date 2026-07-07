"use client";

import { use } from "react";
import Link from "next/link";
import { useEvent } from "@/hooks/use-events";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: event, isLoading, isError } = useEvent(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="mt-4 h-4 w-1/3" />
        <Skeleton className="mt-8 h-32 w-full" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-destructive">Event not found.</p>
        <Link href="/events" className="text-sm underline">
          Back to events
        </Link>
      </div>
    );
  }

  const seatsLeft = event.capacity - event.registeredCount;
  const isCancelled = event.status === "cancelled";
  const soldOut = seatsLeft <= 0 || isCancelled;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to events
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{event.name}</h1>
        {isCancelled ? (
          <Badge variant="destructive">Event cancelled</Badge>
        ) : seatsLeft <= 0 ? (
          <Badge variant="destructive">Sold out</Badge>
        ) : (
          <Badge variant="secondary">{seatsLeft} seats left</Badge>
        )}
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        Organized by {event.organizerName}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase text-muted-foreground">Date</p>
          <p className="text-sm font-medium">{formatEventDate(event.startsAt)}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-muted-foreground">Time</p>
          <p className="text-sm font-medium">
            {formatEventTime(event.startsAt)} – {formatEventTime(event.endsAt)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-muted-foreground">Venue</p>
          <p className="text-sm font-medium">{event.venue}</p>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h2 className="text-lg font-medium">About this event</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="text-xs uppercase text-muted-foreground">Ticket price</p>
          <p className="text-xl font-semibold">
            {formatPrice(event.ticketPrice, event.currency)}
          </p>
        </div>
        <Button
          size="lg"
          disabled={soldOut}
          nativeButton={false}
          render={<Link href={soldOut ? "#" : `/events/${event.id}/register`} />}
        >
          {isCancelled ? "Event cancelled" : soldOut ? "Sold out" : "Register"}
        </Button>
      </div>
    </div>
  );
}
