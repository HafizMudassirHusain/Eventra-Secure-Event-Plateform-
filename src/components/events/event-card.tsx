import Link from "next/link";
import { EventSummary } from "@/types/event";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEventDate, formatPrice } from "@/lib/format";

export function EventCard({ event }: { event: EventSummary }) {
  const seatsLeft = event.capacity - event.registeredCount;
  const isCancelled = event.status === "cancelled";

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="h-full transition-colors hover:border-foreground/30">
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-snug">{event.name}</CardTitle>
            {isCancelled ? (
              <Badge variant="destructive" className="shrink-0">
                Cancelled
              </Badge>
            ) : seatsLeft <= 20 && seatsLeft > 0 ? (
              <Badge variant="secondary" className="shrink-0">
                {seatsLeft} left
              </Badge>
            ) : seatsLeft <= 0 ? (
              <Badge variant="destructive" className="shrink-0">
                Sold out
              </Badge>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">{event.venue}</p>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-sm font-medium">{formatEventDate(event.startsAt)}</span>
          <span className="text-sm font-semibold">{formatPrice(event.ticketPrice, event.currency)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
