"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { QRCodeSVG } from "qrcode.react";
import { useRegistration } from "@/hooks/use-registrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatEventDate, formatEventTime } from "@/lib/format";

export default function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { status } = useSession();
  const { data: registration, isLoading } = useRegistration(id);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/tickets/${id}`);
    }
  }, [status, router, id]);

  if (status === "loading" || isLoading) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="mt-6 h-96 w-full" />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="mx-auto max-w-md px-4 py-10 text-center">
        <p className="text-sm text-destructive">Ticket not found.</p>
        <Link href="/my-registrations" className="text-sm underline">
          Back to your registrations
        </Link>
      </div>
    );
  }

  const isReady = registration.status === "confirmed" || registration.status === "checked_in";

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Link
        href="/my-registrations"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to your registrations
      </Link>

      <Card className="mt-4 overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">{registration.event.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {formatEventDate(registration.event.startsAt)} ·{" "}
            {formatEventTime(registration.event.startsAt)}
          </p>
          <p className="text-sm text-muted-foreground">{registration.event.venue}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 py-8">
          {isReady && registration.qrToken ? (
            <>
              <div className="rounded-lg border bg-white p-4">
                <QRCodeSVG value={registration.qrToken} size={200} />
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Show this code at entry. Single-use — it's invalidated once scanned.
              </p>
            </>
          ) : (
            <div className="flex h-[200px] w-[200px] items-center justify-center rounded-lg border border-dashed text-center text-sm text-muted-foreground">
              QR code will appear here once payment is confirmed.
            </div>
          )}

          <Badge variant={isReady ? "default" : "secondary"} className="capitalize">
            {registration.status.replace("_", " ")}
          </Badge>

          <Separator />

          <div className="w-full space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Attendee</span>
              <span>{registration.attendeeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{registration.attendeeEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ticket ID</span>
              <span className="font-mono text-xs">{registration.id}</span>
            </div>
          </div>

          {!isReady && (
            <Button
              className="w-full"
              render={
                <Link href={`/events/${registration.eventId}/pay?registrationId=${registration.id}`} />
              }
              nativeButton={false}
            >
              Complete payment
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
