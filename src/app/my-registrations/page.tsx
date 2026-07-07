"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMyRegistrations, useCancelRegistration } from "@/hooks/use-registrations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { formatEventDate, formatPrice } from "@/lib/format";
import { RegistrationStatus } from "@/types/event";
import { toast } from "sonner";

const statusVariant: Record<RegistrationStatus, "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  checked_in: "secondary",
  pending_payment: "secondary",
  cancelled: "destructive",
};

export default function MyRegistrationsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: registrations, isLoading } = useMyRegistrations(session?.user?.id);
  const cancelRegistration = useCancelRegistration();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/my-registrations");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Your registrations</h1>
      <p className="text-muted-foreground">Manage tickets for events you&apos;ve registered for.</p>

      <div className="mt-8 space-y-3">
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}

        {registrations && registrations.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              You haven&apos;t registered for any events yet.{" "}
              <Link href="/events" className="underline">
                Browse events
              </Link>
              .
            </CardContent>
          </Card>
        )}

        {registrations?.map((reg) => {
          const isCancellable = reg.status === "pending_payment" || reg.status === "confirmed";
          const needsPayment = reg.status === "pending_payment";

          return (
            <Card key={reg.id}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{reg.event.name}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatEventDate(reg.event.startsAt)} · {reg.event.venue}
                  </p>
                </div>
                <Badge variant={statusVariant[reg.status]} className="capitalize">
                  {reg.status.replace("_", " ")}
                </Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {formatPrice(reg.event.ticketPrice, reg.event.currency)}
                </span>
                <div className="flex gap-2">
                  {needsPayment ? (
                    <Button
                      size="sm"
                      nativeButton={false}
                      render={
                        <Link href={`/events/${reg.eventId}/pay?registrationId=${reg.id}`} />
                      }
                    >
                      Pay now
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      nativeButton={false}
                      render={<Link href={`/tickets/${reg.id}`} />}
                    >
                      View ticket
                    </Button>
                  )}

                  {isCancellable && (
                    <AlertDialog>
                      <AlertDialogTrigger render={<Button variant="outline" size="sm" />}>
                        Cancel
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel this registration?</AlertDialogTitle>
                          <AlertDialogDescription>
                            You&apos;ll lose your spot for &quot;{reg.event.name}&quot;. This
                            can&apos;t be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep it</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => {
                              cancelRegistration.mutate(reg.id, {
                                onSuccess: () => toast.success("Registration cancelled."),
                                onError: () => toast.error("Couldn't cancel. Try again."),
                              });
                            }}
                          >
                            Cancel registration
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
