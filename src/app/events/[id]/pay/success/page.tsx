"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRegistration } from "@/hooks/use-registrations";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Stripe redirects here immediately after checkout, but confirmation happens
// asynchronously via webhook — so we poll until the registration flips to
// confirmed, then hand off to the ticket page.
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

  const isConfirmed = registration?.status === "confirmed" || registration?.status === "checked_in";

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
