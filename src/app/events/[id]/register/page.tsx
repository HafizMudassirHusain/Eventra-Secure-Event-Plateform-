"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEvent, useRegisterForEvent } from "@/hooks/use-events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEventDate, formatPrice } from "@/lib/format";
import { toast } from "sonner";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function RegisterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: event, isLoading } = useEvent(id);
  const register = useRegisterForEvent(id);

  const {
    register: registerField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { fullName: "", email: "" },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/events/${id}/register`);
    }
  }, [status, router, id]);

  useEffect(() => {
    if (session?.user) {
      setValue("fullName", session.user.name ?? "");
      setValue("email", session.user.email ?? "");
    }
  }, [session, setValue]);

  function onSubmit(values: RegistrationValues) {
    if (!session?.user?.id) return;

    register.mutate(
      { ...values, userId: session.user.id },
      {
        onSuccess: ({ registrationId }) => {
          if (event?.ticketPrice === 0) {
            toast.success("You're registered!");
            router.push(`/tickets/${registrationId}`);
          } else {
            toast.success("Registration created — continue to payment.");
            router.push(`/events/${id}/pay?registrationId=${registrationId}`);
          }
        },
        onError: () => toast.error("Couldn't register. Please try again."),
      }
    );
  }

  if (status === "loading" || isLoading || !event) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {event.name} · {formatEventDate(event.startsAt)}
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Your details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" placeholder="Jane Doe" {...registerField("fullName")} />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...registerField("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-md bg-muted px-4 py-3 text-sm">
              <span>Total due</span>
              <span className="font-semibold">
                {formatPrice(event.ticketPrice, event.currency)}
              </span>
            </div>

            <Button type="submit" className="w-full" disabled={register.isPending}>
              {register.isPending ? "Submitting…" : "Continue to payment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
