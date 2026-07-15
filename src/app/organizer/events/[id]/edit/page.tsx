"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EventForm, eventToFormDefaults, formValuesToInput } from "@/components/organizer/event-form";
import { useEvent } from "@/hooks/use-events";
import { useUpdateEvent } from "@/hooks/use-organizer-events";
import { useRequireOrganizer } from "@/hooks/use-require-organizer";
import { toast } from "sonner";

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const { isAuthorized } = useRequireOrganizer(`/organizer/events/${id}/edit`);
  const { data: event, isLoading } = useEvent(id);
  const updateEvent = useUpdateEvent(id, session?.accessToken);

  if (!isAuthorized || isLoading || !event) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="mt-6 h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Edit event</h1>
      <p className="mt-1 text-muted-foreground">{event.name}</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Event details</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm
            submitLabel="Save changes"
            isSubmitting={updateEvent.isPending}
            defaultValues={eventToFormDefaults(event)}
            onSubmit={(values) => {
              updateEvent.mutate(formValuesToInput(values), {
                onSuccess: () => {
                  toast.success("Event updated.");
                  router.push(`/organizer/events/${id}`);
                },
                onError: () => toast.error("Couldn't save changes. Please try again."),
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
