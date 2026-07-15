"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { becomeOrganizer } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Single entry point for "start organizing" CTAs across the site. Handles
// every case in one place: not signed in, already an organizer, or a plain
// attendee who needs to be upgraded before reaching the dashboard.
export default function OrganizerGetStartedPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const hasRun = useRef(false);

  useEffect(() => {
    if (status === "loading" || hasRun.current) return;

    if (status === "unauthenticated" || !session) {
      router.push("/signup?callbackUrl=/organizer/get-started");
      return;
    }

    if (session.user.role === "ORGANIZER" || session.user.role === "ADMIN") {
      router.push("/organizer/events/new");
      return;
    }

    hasRun.current = true;
    becomeOrganizer(session.accessToken)
      .then(async ({ accessToken, user }) => {
        await update({ accessToken, role: user.role });
        router.push("/organizer/events/new");
      })
      .catch(() => {
        toast.error("Couldn't set up your organizer account. Please try again.");
        router.push("/organizers");
      });
  }, [status, session, router, update]);

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <Skeleton className="mx-auto h-8 w-2/3" />
      <p className="mt-6 text-sm text-muted-foreground">Setting up your organizer account…</p>
    </div>
  );
}
