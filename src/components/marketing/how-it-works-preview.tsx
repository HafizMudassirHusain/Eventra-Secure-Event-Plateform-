import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    label: "Step 1",
    title: "Choose an event you want to be part of",
    body: "Search or browse published events by name, venue, or price — free and paid alike.",
    gradient: "from-primary/70 to-primary/40",
  },
  {
    label: "Step 2",
    title: "Register and pay securely",
    body: "Sign in, register in seconds, and check out with real Stripe payment for paid events.",
    gradient: "from-blue-500/70 to-blue-500/30",
  },
  {
    label: "Step 3",
    title: "Get your secure QR ticket",
    body: "The moment your registration is confirmed, a single-use QR ticket is ready for entry.",
    gradient: "from-violet-500/70 to-violet-500/30",
  },
] as const;

export function HowItWorksPreview() {
  return (
    <div className="mx-auto max-w-4xl">
      <Reveal>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            From browsing to walking in the door
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 space-y-14">
        {steps.map((step, i) => {
          const isRight = i % 2 === 1;
          return (
            <Reveal key={step.label} direction={isRight ? "right" : "left"}>
              <div
                className={cn(
                  "grid grid-cols-1 items-center gap-6 sm:grid-cols-2",
                  isRight && "sm:[&>*:first-child]:order-2"
                )}
              >
                <div
                  className={`aspect-4/3 rounded-2xl bg-linear-to-br ${step.gradient}`}
                />
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {step.label}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{step.body}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-12 flex justify-center">
          <Button variant="outline" nativeButton={false} render={<Link href="/how-it-works" />}>
            See the full journey, both sides
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
