"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEvent } from "@/hooks/use-events";
import { usePayForRegistration } from "@/hooks/use-registrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

// Placeholder checkout screen. Stripe Elements/Checkout will replace this
// button once payments are wired up in the backend phase.
export default function PayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ registrationId?: string }>;
}) {
  const { id } = use(params);
  const { registrationId } = use(searchParams);
  const router = useRouter();
  const { data: session } = useSession();
  const { data: event, isLoading } = useEvent(id);
  const pay = usePayForRegistration(session?.accessToken);

  function handlePay() {
    if (!registrationId) {
      toast.error("Missing registration — please register again.");
      return;
    }
    pay.mutate(registrationId, {
      onSuccess: (registration) => {
        toast.success("Payment complete — your ticket is ready.");
        router.push(`/tickets/${registration.id}`);
      },
      onError: () => toast.error("Payment failed. Please try again."),
    });
  }

  if (isLoading || !event) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Payment</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Registration {registrationId ?? "pending"} for {event.name}
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Order summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ticket price</span>
            <span>{formatPrice(event.ticketPrice, event.currency)}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-4 text-sm font-semibold">
            <span>Total</span>
            <span>{formatPrice(event.ticketPrice, event.currency)}</span>
          </div>

          <div className="rounded-md border border-dashed p-4 text-xs text-muted-foreground">
            Stripe checkout integrates here in a later phase. This screen
            simulates a successful payment for now so the registration flow
            can be tested end-to-end.
          </div>

          <Button className="w-full" onClick={handlePay} disabled={pay.isPending}>
            {pay.isPending ? "Processing…" : `Pay ${formatPrice(event.ticketPrice, event.currency)}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
