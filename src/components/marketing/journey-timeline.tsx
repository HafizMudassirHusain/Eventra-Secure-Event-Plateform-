import { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface JourneyMoment {
  icon: LucideIcon;
  moment: string;
  body: string;
}

export function JourneyTimeline({ steps }: { steps: JourneyMoment[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />

      <div className="space-y-10 sm:space-y-4">
        {steps.map((step, i) => {
          const isRight = i % 2 === 1;
          return (
            <div
              key={step.moment}
              className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]"
            >
              <div
                className={cn(
                  "hidden sm:block",
                  isRight ? "sm:order-1" : "sm:order-1 sm:text-right"
                )}
              >
                {!isRight && (
                  <Reveal direction="left">
                    <JourneyText step={step} />
                  </Reveal>
                )}
              </div>

              <div className="sm:order-2 flex justify-start sm:justify-center">
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                  <step.icon className="size-4" />
                </div>
              </div>

              <div className="sm:order-3 pl-14 sm:pl-0">
                {/* Mobile: always show here. Desktop: only show on the right side. */}
                <div className="sm:hidden">
                  <Reveal>
                    <JourneyText step={step} />
                  </Reveal>
                </div>
                <div className="hidden sm:block">
                  {isRight && (
                    <Reveal direction="right">
                      <JourneyText step={step} />
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JourneyText({ step }: { step: JourneyMoment }) {
  return (
    <div>
      <h3 className="font-medium">{step.moment}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
    </div>
  );
}
