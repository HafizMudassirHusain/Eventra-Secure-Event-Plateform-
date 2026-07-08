"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useOrganizerEvents } from "@/hooks/use-organizer-events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEventDate, formatPrice } from "@/lib/format";

export default function OrganizerDashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: events, isLoading } = useOrganizerEvents(session?.accessToken);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/organizer");
    }
  }, [status, router]);

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    const query = search.trim().toLowerCase();
    if (!query) return events;
    return events.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query)
    );
  }, [events, search]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your events</h1>
          <p className="text-muted-foreground">
            Create and manage the events you&apos;re organizing.
          </p>
        </div>
        <Button render={<Link href="/organizer/events/new" />} nativeButton={false}>
          Create event
        </Button>
      </div>

      {events && events.length > 0 && (
        <Input
          placeholder="Search your events by name or venue…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-6 sm:max-w-xs"
        />
      )}

      <div className="mt-6 space-y-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}

        {events && events.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              You haven&apos;t created any events yet.
            </CardContent>
          </Card>
        )}

        {events && events.length > 0 && filteredEvents.length === 0 && (
          <p className="text-sm text-muted-foreground">No events match your search.</p>
        )}

        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{event.name}</CardTitle>
                  {event.status === "cancelled" && (
                    <Badge variant="destructive">Cancelled</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatEventDate(event.startsAt)} · {event.venue}
                </p>
              </div>
              <Badge variant="secondary">
                {event.registeredCount}/{event.capacity} registered
              </Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {formatPrice(event.ticketPrice, event.currency)}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link href={`/organizer/events/${event.id}`} />}
                >
                  Manage
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link href={`/organizer/events/${event.id}/edit`} />}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
