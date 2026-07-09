"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PayCancelPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ registrationId?: string }>;
}) {
  const { id } = use(params);
  const { registrationId } = use(searchParams);

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <div>
            <p className="font-medium">Payment cancelled</p>
            <p className="mt-1 text-sm text-muted-foreground">
              No charge was made. You can try again whenever you&apos;re ready.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" render={<Link href="/my-registrations" />} nativeButton={false}>
              My registrations
            </Button>
            <Button
              render={
                <Link
                  href={`/events/${id}/pay${registrationId ? `?registrationId=${registrationId}` : ""}`}
                />
              }
              nativeButton={false}
            >
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
