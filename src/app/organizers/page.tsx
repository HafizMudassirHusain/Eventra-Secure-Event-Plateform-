import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AngledDivider } from "@/components/marketing/angled-divider";
import { ParallaxBlob } from "@/components/motion/parallax-blob";
import { Reveal } from "@/components/motion/reveal";
import {
  ClipboardList,
  Gauge,
  ScanLine,
  Download,
  XCircle,
  RotateCcw,
} from "lucide-react";

export const metadata = {
  title: "For Organizers — Eventra",
  description: "Run the door like you actually know who's walking through it.",
};

const CAPABILITIES = [
  {
    icon: ClipboardList,
    title: "See every registration as it happens",
    body: "No spreadsheet someone forgot to update. The dashboard shows who's registered, who's paid, who's confirmed — live.",
  },
  {
    icon: Gauge,
    title: "Capacity that enforces itself",
    body: "Set a limit once. Registration closes automatically when you're full — no manual tracking, no overselling.",
  },
  {
    icon: ScanLine,
    title: "Check people in without the chaos",
    body: "Mark attendees checked in from the registrations table as they arrive. No paper list, no guessing who already came in.",
  },
  {
    icon: Download,
    title: "Export your attendee list anytime",
    body: "One click gets you a CSV of names, emails, and status — for your records or for handing to door staff.",
  },
  {
    icon: XCircle,
    title: "Cancel a registration or the whole event",
    body: "Plans change. Pull a single attendee's spot, or cancel the entire event — attendees see it immediately, and no one can register into something that isn't happening.",
  },
  {
    icon: RotateCcw,
    title: "Republish when you're ready",
    body: "Cancelled an event by mistake, or plans came back together? Bring it back with one click.",
  },
] as const;

export default function OrganizersPage() {
  return (
    <div>
      <section className="relative flex flex-col items-center overflow-hidden px-4 py-20 text-center">
        <ParallaxBlob className="-right-24 top-10 bg-primary" speed={0.3} />
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            For organizers
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Run the door like you actually know who&apos;s walking through it.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Paper lists and screenshot tickets fall apart the moment more
            than a few dozen people show up. Eventra doesn&apos;t.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/organizer/get-started" />}>
              Create your first event
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/how-it-works" />}
            >
              See the full flow
            </Button>
          </div>
        </Reveal>
      </section>

      <AngledDivider />

      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 3) * 0.1}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <cap.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-medium">{cap.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cap.body}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <AngledDivider flip />

      <Reveal>
        <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Your first event can be live in a few minutes.
          </h2>
          <p className="mt-3 text-muted-foreground">
            No setup calls, no sales team. Create an account and start.
          </p>
          <Button
            size="lg"
            className="mt-6"
            nativeButton={false}
            render={<Link href="/organizer/get-started" />}
          >
            Get started
          </Button>
        </section>
      </Reveal>
    </div>
  );
}
