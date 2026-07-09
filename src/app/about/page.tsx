import { Reveal } from "@/components/motion/reveal";

export const metadata = {
  title: "About — Eventra",
  description: "Why Eventra exists.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          About
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          We got tired of watching door staff argue with five copies of the
          same ticket.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 space-y-5 text-muted-foreground">
          <p>
            Most event ticketing still comes down to a QR code in a
            screenshot — which means it can be forwarded, copied, and reused
            by anyone who has it. The person checking tickets at the door has
            no way to tell the difference between the real attendee and
            someone holding a copy.
          </p>
          <p>
            Eventra was built around a simpler idea: a ticket should stop
            working the instant it&apos;s used. Not because the screenshot
            disappears — screenshots don&apos;t disappear — but because the
            token behind it does. One registration, one payment, one token,
            one entry.
          </p>
          <p>
            That&apos;s the whole premise. Organizers get a dashboard that
            actually reflects who&apos;s coming and who&apos;s already
            inside. Attendees get a ticket that&apos;s genuinely theirs, not
            a race to see who scans first.
          </p>
          <p className="text-foreground">
            We&apos;re still building this out — payments run on real Stripe
            checkout today, and the ticket security model is the foundation
            everything else is built on top of.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
