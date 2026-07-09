import { KeyRound, ShieldCheck, Undo2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const POINTS = [
  {
    icon: KeyRound,
    title: "One ticket, one use",
    body: "Every registration gets a token tied to it and only it. There's no version of the flow where two people scan their way in on the same code.",
  },
  {
    icon: ShieldCheck,
    title: "Payment confirmed before the ticket exists",
    body: "Tickets for paid events aren't issued until Stripe confirms the charge went through — not when someone clicks \"pay,\" when the money actually lands.",
  },
  {
    icon: Undo2,
    title: "Cancel anytime, capacity updates instantly",
    body: "If an attendee cancels or an organizer pulls the plug on an event, seats free up and status changes right away — nobody's holding a ticket to something that isn't happening.",
  },
] as const;

export function TrustSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <Reveal>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Why it holds up
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Not just a QR code. A verified transaction.
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {POINTS.map((point, i) => (
          <Reveal key={point.title} delay={i * 0.12}>
            <div className="flex flex-col items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <point.icon className="size-5" />
              </div>
              <h3 className="font-medium">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
