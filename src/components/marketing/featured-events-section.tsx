"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useEvents } from "@/hooks/use-events";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/motion/reveal";
import { formatEventDate, formatPrice } from "@/lib/format";

const cardGradients = [
  "from-primary/70 to-primary/40",
  "from-blue-500/70 to-blue-500/30",
  "from-violet-500/70 to-violet-500/30",
];

export function FeaturedEventsSection() {
  const { data: events, isLoading } = useEvents();

  const featured = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => e.status === "published").slice(0, 3);
  }, [events]);

  if (!isLoading && featured.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Featured events
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Be sure not to miss these
            </h2>
          </div>
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/events" />}
          >
            View all events
          </Button>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl" />
          ))}

        {featured.map((event, i) => (
          <Reveal key={event.id} delay={i * 0.1}>
            <Card className="h-full overflow-hidden py-0">
              <div
                className={`aspect-video bg-linear-to-br ${cardGradients[i % cardGradients.length]}`}
              />
              <CardContent className="flex flex-col gap-3 py-5">
                <span className="text-sm font-medium text-primary">
                  {formatPrice(event.ticketPrice, event.currency)}
                </span>
                <h3 className="font-medium leading-snug">{event.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatEventDate(event.startsAt)} · {event.venue}
                </p>
                <Button
                  variant="outline"
                  className="mt-2 w-fit"
                  nativeButton={false}
                  render={<Link href={`/events/${event.id}`} />}
                >
                  Get tickets
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <Button variant="outline" nativeButton={false} render={<Link href="/events" />}>
          View all events
        </Button>
      </div>
    </div>
  );
}
