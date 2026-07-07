"use client";

import { useMemo, useState } from "react";
import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/events/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PriceFilter = "all" | "free" | "paid";

export default function EventsPage() {
  const { data: events, isLoading, isError } = useEvents();
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        event.name.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query);

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && event.ticketPrice === 0) ||
        (priceFilter === "paid" && event.ticketPrice > 0);

      return matchesSearch && matchesPrice;
    });
  }, [events, search, priceFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Upcoming events</h1>
        <p className="text-muted-foreground">Browse and register for events near you.</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search by event name or venue…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-2">
          {(["all", "free", "paid"] as const).map((option) => (
            <Button
              key={option}
              size="sm"
              variant="outline"
              className={cn(priceFilter === option && "bg-muted text-foreground")}
              onClick={() => setPriceFilter(option)}
            >
              {option === "all" ? "All" : option === "free" ? "Free" : "Paid"}
            </Button>
          ))}
        </div>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Couldn&apos;t load events. Please try again shortly.
        </p>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-xl" />
          ))}
        </div>
      )}

      {events && filteredEvents.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {events.length === 0 ? "No events published yet." : "No events match your search."}
        </p>
      )}

      {filteredEvents.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
