"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRegistration, useSyncPaymentStatus } from "@/hooks/use-registrations";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Stripe redirects here immediately after checkout, but confirmation normally
// happens asynchronously via webhook. Since a local dev webhook listener can
// miss events (e.g. it wasn't running when payment completed), we also poll
// a fallback endpoint that checks the payment status directly with Stripe —
// so this page can't get stuck waiting on a webhook that never arrives.
export default function PaySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ registrationId?: string }>;
}) {
  const { registrationId } = use(searchParams);
  const router = useRouter();
  const { data: session } = useSession();
  const { data: registration } = useRegistration(registrationId ?? "", session?.accessToken, {
    poll: true,
  });
  const syncPayment = useSyncPaymentStatus(session?.accessToken);

  const isConfirmed = registration?.status === "confirmed" || registration?.status === "checked_in";

  useEffect(() => {
    if (!registrationId || !session?.accessToken || isConfirmed) return;

    syncPayment.mutate(registrationId);
    const interval = setInterval(() => syncPayment.mutate(registrationId), 2500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationId, session?.accessToken, isConfirmed]);

  useEffect(() => {
    if (isConfirmed && registrationId) {
      router.replace(`/tickets/${registrationId}`);
    }
  }, [isConfirmed, registrationId, router]);

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <p className="font-medium">Confirming your payment…</p>
            <p className="mt-1 text-sm text-muted-foreground">
              This only takes a moment. Don&apos;t close this page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
