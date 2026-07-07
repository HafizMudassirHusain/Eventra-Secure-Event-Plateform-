"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventDetail, EventInput } from "@/types/event";

const eventSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Add a short description (10+ characters)"),
    venue: z.string().min(2, "Venue is required"),
    startsAt: z.string().min(1, "Start date/time is required"),
    endsAt: z.string().min(1, "End date/time is required"),
    ticketPrice: z.number().min(0, "Price can't be negative"),
    currency: z.string().min(1),
    capacity: z.number().int().min(1, "Capacity must be at least 1"),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "End time must be after start time",
    path: ["endsAt"],
  });

export type EventFormValues = z.infer<typeof eventSchema>;

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export function eventToFormDefaults(event: EventDetail): EventFormValues {
  return {
    name: event.name,
    description: event.description,
    venue: event.venue,
    startsAt: toLocalInput(event.startsAt),
    endsAt: toLocalInput(event.endsAt),
    ticketPrice: event.ticketPrice,
    currency: event.currency,
    capacity: event.capacity,
  };
}

export function formValuesToInput(values: EventFormValues): EventInput {
  return {
    ...values,
    startsAt: new Date(values.startsAt).toISOString(),
    endsAt: new Date(values.endsAt).toISOString(),
  };
}

export function EventForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}: {
  defaultValues?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  isSubmitting: boolean;
  submitLabel: string;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      venue: "",
      startsAt: "",
      endsAt: "",
      ticketPrice: 0,
      currency: "PKR",
      capacity: 100,
    },
  });

  const currency = watch("currency");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Event name</Label>
        <Input id="name" placeholder="TechConnect Summit 2026" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="What is this event about?"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="venue">Venue</Label>
        <Input id="venue" placeholder="Expo Center, Karachi" {...register("venue")} />
        {errors.venue && <p className="text-sm text-destructive">{errors.venue.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startsAt">Starts at</Label>
          <Input id="startsAt" type="datetime-local" {...register("startsAt")} />
          {errors.startsAt && (
            <p className="text-sm text-destructive">{errors.startsAt.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endsAt">Ends at</Label>
          <Input id="endsAt" type="datetime-local" {...register("endsAt")} />
          {errors.endsAt && (
            <p className="text-sm text-destructive">{errors.endsAt.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="ticketPrice">Ticket price</Label>
          <Input
            id="ticketPrice"
            type="number"
            min={0}
            step="1"
            {...register("ticketPrice", { valueAsNumber: true })}
          />
          {errors.ticketPrice && (
            <p className="text-sm text-destructive">{errors.ticketPrice.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={currency}
            onValueChange={(v) => v && setValue("currency", v)}
          >
            <SelectTrigger id="currency" className="w-full">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PKR">PKR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            min={1}
            {...register("capacity", { valueAsNumber: true })}
          />
          {errors.capacity && (
            <p className="text-sm text-destructive">{errors.capacity.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
