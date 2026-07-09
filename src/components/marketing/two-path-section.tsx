import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function TwoPathSection() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
      <Reveal direction="left" className="sm:pt-0">
        <Card className="flex h-full flex-col shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Going to an event
            </p>
            <CardTitle className="text-xl">You just want in the door.</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              Find the event, register, pay if there&apos;s a ticket price,
              and get a ticket that&apos;s actually yours &mdash; not a
              screenshot someone else can reuse.
            </p>
            <Button
              variant="outline"
              className="w-fit"
              nativeButton={false}
              render={<Link href="/events" />}
            >
              Browse events <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal direction="right" delay={0.15} className="sm:pt-10">
        <Card className="flex h-full flex-col shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Organizing an event
            </p>
            <CardTitle className="text-xl">
              You need to know who&apos;s actually walking in.
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              Create the event, watch registrations come in, check people in
              at the door, and cancel or export the list whenever you need
              to.
            </p>
            <Button
              variant="outline"
              className="w-fit"
              nativeButton={false}
              render={<Link href="/organizers" />}
            >
              See how organizing works <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
