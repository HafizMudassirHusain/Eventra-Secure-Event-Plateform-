"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEvent } from "@/hooks/use-events";
import {
  useCancelRegistrationAsOrganizer,
  useCheckInRegistration,
  useDeleteEvent,
  useRegistrations,
  useUpdateEventStatus,
} from "@/hooks/use-organizer-events";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatEventDate, formatPrice, toSummary } from "@/lib/format";
import { exportRegistrationsCsv } from "@/lib/api";
import { RegistrationStatus } from "@/types/event";
import { toast } from "sonner";

const statusVariant: Record<RegistrationStatus, "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  checked_in: "secondary",
  pending_payment: "secondary",
  cancelled: "destructive",
};

export default function ManageEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const { data: event, isLoading } = useEvent(id);
  const { data: registrations, isLoading: registrationsLoading } = useRegistrations(id, token);
  const deleteEvent = useDeleteEvent(token);
  const updateStatus = useUpdateEventStatus(id, token);
  const checkIn = useCheckInRegistration(id, token);
  const cancelRegistration = useCancelRegistrationAsOrganizer(id, token);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/organizer/events/${id}`);
    }
  }, [status, router, id]);

  if (isLoading || !event) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );
  }

  const isCancelled = event.status === "cancelled";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/organizer" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to your events
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{event.name}</h1>
            {isCancelled && <Badge variant="destructive">Cancelled</Badge>}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatEventDate(event.startsAt)} · {event.venue}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/organizer/events/${id}/edit`} />}
          >
            Edit
          </Button>

          {isCancelled ? (
            <Button
              variant="outline"
              size="sm"
              disabled={updateStatus.isPending}
              onClick={() => {
                updateStatus.mutate("published", {
                  onSuccess: () => toast.success("Event republished."),
                  onError: () => toast.error("Couldn't update event status."),
                });
              }}
            >
              Republish
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" size="sm" />}>
                Cancel event
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel this event?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Attendees won&apos;t be able to register anymore. The event stays
                    visible but marked cancelled. You can republish it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep it</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => {
                      updateStatus.mutate("cancelled", {
                        onSuccess: () => toast.success("Event cancelled."),
                        onError: () => toast.error("Couldn't cancel event."),
                      });
                    }}
                  >
                    Cancel event
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this event?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove &quot;{event.name}&quot; and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    deleteEvent.mutate(id, {
                      onSuccess: () => {
                        toast.success("Event deleted.");
                        router.push("/organizer");
                      },
                      onError: () => toast.error("Couldn't delete event."),
                    });
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">Registered</p>
            <p className="text-xl font-semibold">
              {event.registeredCount}/{event.capacity}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">Ticket price</p>
            <p className="text-xl font-semibold">
              {formatPrice(event.ticketPrice, event.currency)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-xl font-semibold capitalize">{event.status}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground">Seats left</p>
            <p className="text-xl font-semibold">
              {event.capacity - event.registeredCount}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Registrations</CardTitle>
          {registrations && registrations.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportRegistrationsCsv(toSummary(event), registrations)}
            >
              Export CSV
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {registrationsLoading && <Skeleton className="h-32 w-full" />}

          {registrations && registrations.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No registrations yet.
            </p>
          )}

          {registrations && registrations.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attendee</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => {
                  const canCheckIn = reg.status === "confirmed";
                  const canCancel = reg.status === "confirmed" || reg.status === "pending_payment";

                  return (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.attendeeName}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {reg.attendeeEmail}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[reg.status]}>
                          {reg.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatEventDate(reg.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          {canCheckIn && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={checkIn.isPending}
                              onClick={() => {
                                checkIn.mutate(reg.id, {
                                  onSuccess: () => toast.success("Checked in."),
                                  onError: () => toast.error("Couldn't check in."),
                                });
                              }}
                            >
                              Check in
                            </Button>
                          )}
                          {canCancel && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={cancelRegistration.isPending}
                              onClick={() => {
                                cancelRegistration.mutate(reg.id, {
                                  onSuccess: () => toast.success("Registration cancelled."),
                                  onError: () => toast.error("Couldn't cancel registration."),
                                });
                              }}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
