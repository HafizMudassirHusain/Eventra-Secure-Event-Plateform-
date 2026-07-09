"use client";

import { use } from "react";
import { useSession } from "next-auth/react";
import { useEvent } from "@/hooks/use-events";
import { useCreateCheckoutSession } from "@/hooks/use-registrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

export default function PayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ registrationId?: string }>;
}) {
  const { id } = use(params);
  const { registrationId } = use(searchParams);
  const { data: session } = useSession();
  const { data: event, isLoading } = useEvent(id);
  const checkout = useCreateCheckoutSession(session?.accessToken);

  function handlePay() {
    if (!registrationId) {
      toast.error("Missing registration — please register again.");
      return;
    }
    checkout.mutate(registrationId, {
      onSuccess: ({ url }) => {
        window.location.href = url;
      },
      onError: () => toast.error("Couldn't start checkout. Please try again."),
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

          <Button className="w-full" onClick={handlePay} disabled={checkout.isPending}>
            {checkout.isPending
              ? "Redirecting to Stripe…"
              : `Pay ${formatPrice(event.ticketPrice, event.currency)}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
