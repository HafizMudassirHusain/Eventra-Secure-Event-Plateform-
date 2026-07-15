"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ORGANIZER_ROLES = ["ORGANIZER", "ADMIN"];

export function useRequireOrganizer(callbackUrl: string) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    if (status === "authenticated" && !ORGANIZER_ROLES.includes(session.user.role)) {
      router.push("/organizers");
    }
  }, [status, session, router, callbackUrl]);

  const isAuthorized = status === "authenticated" && ORGANIZER_ROLES.includes(session.user.role);

  return { status, isAuthorized };
}
