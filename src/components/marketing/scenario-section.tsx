import { Reveal } from "@/components/motion/reveal";

export function ScenarioSection() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <Reveal direction="left">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            A scenario
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            It&apos;s 7:52 PM.
            <br />
            Two hundred people are trying to get in at once.
          </h2>
        </div>
      </Reveal>

      <Reveal direction="right" delay={0.1}>
        <div className="space-y-5 text-muted-foreground sm:text-lg">
          <p>
            Someone forwarded their ticket screenshot to four friends earlier
            that afternoon &mdash; &quot;just in case.&quot; Now all five of
            them are at the door, holding the same QR code, and the volunteer
            scanning tickets has no way to tell which one is real.
          </p>
          <p>
            This happens at almost every event that hands out a QR code and
            hopes for the best. A screenshot doesn&apos;t know it&apos;s been
            copied.
          </p>
          <p className="border-l-2 border-primary pl-5 text-xl font-medium text-foreground">
            A single-use token does.
          </p>
          <p>
            Every ticket Eventra issues is tied to one registration, verified
            against the server the moment it&apos;s scanned, and permanently
            dead the instant it&apos;s used &mdash; for every copy of it,
            screenshot or not.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
