import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AngledDivider } from "@/components/marketing/angled-divider";
import { ParallaxBlob } from "@/components/motion/parallax-blob";
import { Reveal } from "@/components/motion/reveal";
import {
  ShieldCheck,
  Zap,
  Users2,
  CreditCard,
  QrCode,
  Gauge,
} from "lucide-react";

export const metadata = {
  title: "About — Eventra",
  description:
    "Why Eventra exists, what makes its tickets different, and what we're building next.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Security first",
    body: "Every ticket is a single-use token tied to a confirmed, paid registration — not a screenshot someone can pass around.",
  },
  {
    icon: Zap,
    title: "No unnecessary friction",
    body: "Attendees register and pay in minutes. Organizers get a working dashboard on day one, not after a sales call.",
  },
  {
    icon: Users2,
    title: "Built for both sides",
    body: "One platform, two experiences — a clean event feed for attendees, a real operations tool for organizers.",
  },
] as const;

const REALITY_CHECK = [
  {
    icon: CreditCard,
    title: "Payments are real",
    body: "Checkout runs on live Stripe integration, not a simulated \"pay\" button. Money genuinely moves before a ticket is issued.",
  },
  {
    icon: QrCode,
    title: "Tickets are real tokens",
    body: "Each confirmed registration gets a unique, single-use QR code generated server-side — never derived from something screenshot-able.",
  },
  {
    icon: Gauge,
    title: "Capacity is enforced, live",
    body: "Once an event fills up, the backend rejects further registrations immediately. No overselling, no manual tracking.",
  },
] as const;

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex flex-col items-center overflow-hidden px-4 py-20 text-center sm:py-28">
        <ParallaxBlob className="-left-32 top-0 bg-primary" speed={0.3} />
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            About Eventra
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            We got tired of watching door staff argue with five copies of the
            same ticket.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Most event ticketing still comes down to a QR code in a
            screenshot — forwardable, copyable, reusable by anyone who has
            it. Eventra was built to close that gap.
          </p>
        </Reveal>
      </section>

      <AngledDivider />

      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <div className="space-y-5 text-muted-foreground">
            <p>
              The person checking tickets at the door has no way to tell the
              difference between the real attendee and someone holding a
              copy of the same QR code. Screenshots don&apos;t expire, don&apos;t
              get revoked, and don&apos;t know they&apos;ve already been used.
            </p>
            <p>
              Eventra was built around a simpler idea:{" "}
              <span className="text-foreground">
                a ticket should stop working the instant it&apos;s used
              </span>
              . Not because the screenshot disappears — screenshots don&apos;t
              disappear — but because the token behind it does. One
              registration, one payment, one token, one entry.
            </p>
            <p>
              That&apos;s the whole premise. Organizers get a dashboard that
              actually reflects who&apos;s coming and who&apos;s already
              inside. Attendees get a ticket that&apos;s genuinely theirs,
              not a race to see who scans first.
            </p>
          </div>
        </Reveal>
      </section>

      <AngledDivider flip />

      <section className="bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                What we believe
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Three principles behind every decision
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <div className="flex h-full flex-col items-start gap-3 rounded-xl bg-background p-6 shadow-sm">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="size-5" />
                  </div>
                  <h3 className="font-medium">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AngledDivider />

      <section className="mx-auto max-w-5xl px-4 py-20">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Built transparently
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              What&apos;s actually working today
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Eventra is early and still growing, but nothing here is a mockup.
              Here&apos;s what&apos;s genuinely live right now.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {REALITY_CHECK.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
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
            See it for yourself.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Browse live events, or start organizing your own — no sales call
            required.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/events" />}>
              Browse events
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/how-it-works" />}
            >
              See how it works
            </Button>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
