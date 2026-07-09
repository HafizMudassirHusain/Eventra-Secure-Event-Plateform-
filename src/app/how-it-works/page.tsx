import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JourneyTimeline } from "@/components/marketing/journey-timeline";
import { AngledDivider } from "@/components/marketing/angled-divider";
import { Reveal } from "@/components/motion/reveal";
import {
  Search,
  UserPlus,
  CreditCard,
  Ticket,
  ScanLine,
  PlusCircle,
  Users,
  Gauge,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export const metadata = {
  title: "How it works — Eventra",
  description:
    "The attendee journey and the organizer journey, moment by moment.",
};

const ATTENDEE_STEPS = [
  {
    icon: Search,
    moment: "You find something worth going to",
    body: "Search or browse published events — name, venue, free or paid, whatever's relevant to you.",
  },
  {
    icon: UserPlus,
    moment: "You register in under a minute",
    body: "Your name and email are pulled from your account automatically. No re-typing anything.",
  },
  {
    icon: CreditCard,
    moment: "If there's a price, you pay it — for real",
    body: "Paid events route through actual Stripe checkout. Nothing is confirmed until the payment genuinely goes through.",
  },
  {
    icon: Ticket,
    moment: "Your ticket shows up, already secure",
    body: "The moment payment clears, a single-use QR token is generated and tied to your registration — not to a screenshot.",
  },
  {
    icon: ScanLine,
    moment: "You walk in. It's scanned once. That's it.",
    body: "At the door, your ticket is checked against the server, marked used, and can never be scanned again.",
  },
];

const ORGANIZER_STEPS = [
  {
    icon: PlusCircle,
    moment: "You put the event out there",
    body: "Name, description, venue, date, capacity, price — published in a couple of minutes.",
  },
  {
    icon: Users,
    moment: "Registrations start coming in",
    body: "Every signup shows up on your dashboard in real time, with status: awaiting payment, confirmed, or checked in.",
  },
  {
    icon: Gauge,
    moment: "You know exactly how full you are",
    body: "Capacity is enforced automatically — once you're full, registration closes on its own. No overselling.",
  },
  {
    icon: CheckCircle2,
    moment: "Doors open, you check people in",
    body: "Mark attendees checked in as they arrive, right from the registrations table.",
  },
  {
    icon: SlidersHorizontal,
    moment: "If something changes, you're in control",
    body: "Cancel a single registration, cancel the whole event, or export your attendee list — whenever you need to.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <Reveal>
        <div className="mx-auto max-w-3xl px-4 pt-16 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            How it works
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Two journeys. One ticket that actually holds up.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Here&apos;s exactly what happens, whichever side of the door
            you&apos;re on.
          </p>
        </div>
      </Reveal>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight">
            If you&apos;re going to an event
          </h2>
        </Reveal>
        <div className="mt-10">
          <JourneyTimeline steps={ATTENDEE_STEPS} />
        </div>
        <Reveal>
          <Button
            className="mt-6"
            nativeButton={false}
            render={<Link href="/events" />}
          >
            Browse events
          </Button>
        </Reveal>
      </section>

      <AngledDivider />

      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight">
            If you&apos;re organizing one
          </h2>
        </Reveal>
        <div className="mt-10">
          <JourneyTimeline steps={ORGANIZER_STEPS} />
        </div>
        <Reveal>
          <Button
            className="mt-6"
            nativeButton={false}
            render={<Link href="/organizers" />}
          >
            See the organizer side
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
