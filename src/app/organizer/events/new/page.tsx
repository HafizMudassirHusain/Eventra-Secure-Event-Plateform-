"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EventForm, formValuesToInput } from "@/components/organizer/event-form";
import { useCreateEvent } from "@/hooks/use-organizer-events";
import { useRequireOrganizer } from "@/hooks/use-require-organizer";
import { toast } from "sonner";

export default function NewEventPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isAuthorized } = useRequireOrganizer("/organizer/events/new");
  const createEvent = useCreateEvent(session?.accessToken);

  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="mt-6 h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Create event</h1>
      <p className="mt-1 text-muted-foreground">
        Fill in the details attendees will see.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Event details</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm
            submitLabel="Create event"
            isSubmitting={createEvent.isPending}
            onSubmit={(values) => {
              createEvent.mutate(formValuesToInput(values), {
                onSuccess: (event) => {
                  toast.success("Event created.");
                  router.push(`/organizer/events/${event.id}`);
                },
                onError: () => toast.error("Couldn't create event. Please try again."),
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
